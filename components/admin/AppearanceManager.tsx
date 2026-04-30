"use client";

import { useRef, useState, useCallback } from "react";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80";
const DEFAULT_HERO_POSITION = "50% 50%";

function parsePosToXY(pos: string): { x: number; y: number } {
  const parts = pos.trim().split(/\s+/);
  const parse = (v: string) => parseFloat(v.replace("%", ""));
  if (parts.length === 2) return { x: parse(parts[0]), y: parse(parts[1]) };
  return { x: 50, y: 50 };
}

interface Props {
  initialHeroImageUrl: string;
  initialHeroImagePosition: string;
}

export default function AppearanceManager({ initialHeroImageUrl, initialHeroImagePosition }: Props) {
  const [imageUrl, setImageUrl] = useState(initialHeroImageUrl);
  const [urlInput, setUrlInput] = useState(
    initialHeroImageUrl === DEFAULT_HERO_IMAGE ? "" : initialHeroImageUrl
  );
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [uploadError, setUploadError] = useState("");
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const [position, setPosition] = useState<{ x: number; y: number }>(
    parsePosToXY(initialHeroImagePosition || DEFAULT_HERO_POSITION)
  );
  const [positionSaveStatus, setPositionSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const focalPickerRef = useRef<HTMLDivElement>(null);

  const positionCss = `${position.x}% ${position.y}%`;

  async function handleSave(url: string, pos?: { x: number; y: number }) {
    const savedPos = pos ?? position;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroImageUrl: url,
          heroImagePosition: `${savedPos.x}% ${savedPos.y}%`,
        }),
      });
      if (!res.ok) throw new Error();
      setImageUrl(url);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }

  async function handleSavePosition() {
    setPositionSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroImageUrl: imageUrl,
          heroImagePosition: positionCss,
        }),
      });
      if (!res.ok) throw new Error();
      setPositionSaveStatus("saved");
      setTimeout(() => setPositionSaveStatus("idle"), 3000);
    } catch {
      setPositionSaveStatus("error");
      setTimeout(() => setPositionSaveStatus("idle"), 3000);
    }
  }

  function calcPositionFromEvent(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): { x: number; y: number } | null {
    const el = focalPickerRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    let clientX: number, clientY: number;
    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const x = Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)));
    return { x, y };
  }

  const handlePickerMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      const pos = calcPositionFromEvent(e);
      if (pos) setPosition(pos);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePickerMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      const pos = calcPositionFromEvent(e);
      if (pos) setPosition(pos);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDragging]
  );

  const handlePickerMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handlePickerTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      setIsDragging(true);
      const pos = calcPositionFromEvent(e);
      if (pos) setPosition(pos);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePickerTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      const pos = calcPositionFromEvent(e);
      if (pos) setPosition(pos);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /** Compress an image file client-side and return a base64 data URL. */
  function compressImage(file: File, maxWidth = 1920, quality = 0.82): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxWidth / img.width);
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) { reject(new Error("Canvas not available")); return; }
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => reject(new Error("Could not read image"));
        img.src = ev.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Could not read file"));
      reader.readAsDataURL(file);
    });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus("uploading");
    setUploadError("");

    try {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) throw new Error("Invalid file type. Use JPG, PNG or WebP.");
      if (file.size > 10 * 1024 * 1024) throw new Error("File too large. Max 10 MB.");

      const dataUrl = await compressImage(file);
      setUploadStatus("idle");
      await handleSave(dataUrl);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
      setUploadStatus("error");
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleUrlSave() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    await handleSave(trimmed);
  }

  async function handleReset() {
    setUrlInput("");
    setPosition(parsePosToXY(DEFAULT_HERO_POSITION));
    await handleSave(DEFAULT_HERO_IMAGE, parsePosToXY(DEFAULT_HERO_POSITION));
  }

  const isDefault = imageUrl === DEFAULT_HERO_IMAGE;

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-sm text-blue-700">
          La imagen se muestra como fondo del <strong>hero principal</strong> de la página de inicio. Sube una foto o pega una URL externa.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: current preview */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 text-sm">Imagen actual</h3>
            {!isDefault && (
              <button
                onClick={handleReset}
                disabled={saveStatus === "saving"}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Restaurar original
              </button>
            )}
          </div>
          <div className="relative h-56 bg-gray-100 mx-5 mb-5 rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary hero preview URLs */}
            <img
              src={imageUrl}
              alt="Hero preview"
              className="w-full h-full object-cover"
              style={{ objectPosition: positionCss }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_HERO_IMAGE;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/80 to-navy/50" />
            <div className="absolute inset-0 flex items-center px-6">
              <div>
                <div className="w-24 h-3 bg-white/30 rounded mb-2" />
                <div className="w-48 h-6 bg-white/60 rounded mb-2" />
                <div className="w-36 h-4 bg-white/30 rounded" />
              </div>
            </div>
            {isDefault && (
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
                Imagen original
              </div>
            )}
          </div>
        </div>

        {/* Right: upload/URL controls */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-5">
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5">
              <button
                onClick={() => setTab("upload")}
                className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all duration-150 ${
                  tab === "upload"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Subir archivo
              </button>
              <button
                onClick={() => setTab("url")}
                className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all duration-150 ${
                  tab === "url"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                URL externa
              </button>
            </div>

            {tab === "upload" ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadStatus === "uploading" || saveStatus === "saving"}
                  className="w-full border-2 border-dashed border-gray-300 hover:border-gold hover:bg-gold/5 rounded-xl p-8 text-center transition-all duration-200 group disabled:opacity-50"
                >
                  {uploadStatus === "uploading" ? (
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-7 h-7 animate-spin text-gold" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span className="text-sm text-gray-500">Subiendo imagen...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 group-hover:bg-gold/10 rounded-xl flex items-center justify-center transition-colors">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          Haz clic para seleccionar imagen
                        </p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP · Máx. 5 MB</p>
                      </div>
                    </div>
                  )}
                </button>
                {uploadStatus === "error" && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    {uploadError}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    URL de imagen
                  </label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">Soporta Unsplash, Pexels u cualquier URL de imagen pública.</p>
                </div>
                <button
                  onClick={handleUrlSave}
                  disabled={!urlInput.trim() || saveStatus === "saving"}
                  className="w-full bg-navy hover:bg-navy-light text-white font-semibold py-2.5 rounded-xl text-sm transition-all duration-200 disabled:opacity-50 shadow-sm"
                >
                  Aplicar URL
                </button>
              </div>
            )}

            {/* Save status */}
            {saveStatus !== "idle" && (
              <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${
                saveStatus === "saved" ? "text-green-600" :
                saveStatus === "error" ? "text-red-600" :
                "text-gray-500"
              }`}>
                {saveStatus === "saving" && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {saveStatus === "saved" && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
                {saveStatus === "saving" && "Guardando..."}
                {saveStatus === "saved" && "Imagen guardada correctamente"}
                {saveStatus === "error" && "Error al guardar"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Focal Point Picker */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
              </svg>
              Punto focal
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Haz clic o arrastra el punto de enfoque de la imagen. Así se controla qué parte se ve en móvil cuando la imagen se recorta.
            </p>
          </div>
          <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg shrink-0 self-start mt-0.5">
            {position.x}% {position.y}%
          </span>
        </div>

        {/* Interactive image */}
        <div
          ref={focalPickerRef}
          className={`relative mx-5 rounded-xl overflow-hidden bg-gray-100 select-none ${isDragging ? "cursor-grabbing" : "cursor-crosshair"}`}
          style={{ height: 300 }}
          onMouseDown={handlePickerMouseDown}
          onMouseMove={handlePickerMouseMove}
          onMouseUp={handlePickerMouseUp}
          onMouseLeave={handlePickerMouseUp}
          onTouchStart={handlePickerTouchStart}
          onTouchMove={handlePickerTouchMove}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- focal point picker */}
          <img
            src={imageUrl}
            alt="Focal point picker"
            className="w-full h-full object-cover pointer-events-none"
            style={{ objectPosition: positionCss }}
            draggable={false}
            onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_HERO_IMAGE; }}
          />

          {/* Rule-of-thirds grid */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20" />
            <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20" />
            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20" />
            <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/20" />
          </div>

          {/* Mobile frame overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-4">
            <div className="border-2 border-white/40 rounded-2xl w-24 h-[88%] flex flex-col items-center justify-end pb-2 gap-1">
              <div className="w-8 h-1 bg-white/40 rounded-full" />
              <span className="text-white/50 text-[9px] font-medium">móvil</span>
            </div>
          </div>

          {/* Focal point pin */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-white shadow-lg bg-gold/80" />
              <div className="absolute w-px h-14 bg-white/70" />
              <div className="absolute w-14 h-px bg-white/70" />
            </div>
          </div>
        </div>

        {/* Save position footer */}
        <div className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-gray-400">
            El punto dorado indica el centro de enfoque. La imagen se alineará alrededor de este punto en móvil.
          </p>
          <div className="flex items-center gap-3">
            {positionSaveStatus !== "idle" && (
              <span className={`text-xs font-medium flex items-center gap-1.5 ${
                positionSaveStatus === "saved" ? "text-green-600" :
                positionSaveStatus === "error" ? "text-red-600" :
                "text-gray-500"
              }`}>
                {positionSaveStatus === "saving" && (
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {positionSaveStatus === "saved" && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
                {positionSaveStatus === "saving" && "Guardando..."}
                {positionSaveStatus === "saved" && "Posición guardada"}
                {positionSaveStatus === "error" && "Error al guardar"}
              </span>
            )}
            <button
              onClick={handleSavePosition}
              disabled={positionSaveStatus === "saving"}
              className="bg-navy hover:bg-navy-light text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-sm whitespace-nowrap"
            >
              Guardar posición
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
