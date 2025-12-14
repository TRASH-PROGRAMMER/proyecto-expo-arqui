<script setup lang="ts">
import { computed, ref } from "vue";

const text = ref("hola");
const size = ref(256);

const loading = ref(false);
const svg = ref<string>("");
const error = ref<string>("");

const url = computed(() => `/qr?text=${encodeURIComponent(text.value)}&size=${size.value}`);

async function generar() {
  error.value = "";
  svg.value = "";
  loading.value = true;

  try {
    const res = await fetch(url.value, {
      headers: { Accept: "image/svg+xml" },
    });

    if (!res.ok) {
      // si tu API devuelve JSON en error, intenta leerlo:
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const j = await res.json();
        throw new Error(JSON.stringify(j));
      }
      throw new Error(await res.text());
    }

    svg.value = await res.text();
  } catch (e: any) {
    error.value = e?.message ?? "Error generando QR";
  } finally {
    loading.value = false;
  }
}

function descargarSVG() {
  if (!svg.value) return;
  const blob = new Blob([svg.value], { type: "image/svg+xml" });
  const href = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = href;
  a.download = "qr.svg";
  a.click();

  URL.revokeObjectURL(href);
}

// Genera uno al cargar
generar();
</script>

<template>
  <div class="page">
    <header class="header">
      <div>
        <h1>QRGen</h1>
      
      </div>

      <a class="badge" href="/health" target="_blank" rel="noreferrer">/health</a>
    </header>

    <main class="grid">
      <section class="card">
        <h2>Configurar</h2>

        <label class="label">Texto</label>
        <textarea
          v-model="text"
          class="input"
          rows="4"
          placeholder="Escribe algo…"
        />

        <div class="row">
          <div style="flex:1">
            <label class="label">Tamaño: {{ size }}px</label>
            <input v-model.number="size" class="range" type="range" min="128" max="1024" step="8" />
          </div>
        </div>

        <div class="actions">
          <button class="btn" :disabled="loading || !text.trim()" @click="generar">
            {{ loading ? "Generando..." : "Generar QR" }}
          </button>

          <button class="btn secondary" :disabled="!svg" @click="descargarSVG">
            Descargar SVG
          </button>
        </div>

        <div class="hint">
          Endpoint: <code>{{ url }}</code>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
      </section>

      <section class="card">
        <h2>Vista previa</h2>

        <div v-if="!svg && !loading" class="empty">
          Aquí saldrá tu QR 🙂
        </div>

        <div v-if="loading" class="empty">
          Generando…
        </div>

        <!-- Render del SVG -->
        <div v-if="svg" class="preview" v-html="svg"></div>
      </section>
    </main>

    <footer class="footer">
      Hecho con Vue + Vite (proxy a Serverless Offline)
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32px 24px;
  background: 
    radial-gradient(1400px 600px at 15% 10%, rgba(99, 102, 241, 0.15), transparent 60%),
    radial-gradient(1000px 500px at 85% 25%, rgba(168, 85, 247, 0.12), transparent 60%),
    radial-gradient(800px 400px at 50% 90%, rgba(20, 184, 166, 0.08), transparent 60%),
    linear-gradient(180deg, #0b1020 0%, #0a0e1a 100%);
  color: #e5e7eb;
  animation: fadeIn 0.6s ease-out;
}

.header {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header h1 {
  margin: 0;
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeIn 0.8s ease-out 0.2s both;
}

.header p {
  margin: 8px 0 0;
  color: #9ca3af;
  font-size: 15px;
}

.badge {
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid rgba(129, 140, 248, 0.2);
  background: rgba(99, 102, 241, 0.1);
  color: #a5b4fc;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.badge:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(129, 140, 248, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2);
}

.grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

.card {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  padding: 28px;
  transition: all 0.3s ease;
  animation: fadeIn 0.6s ease-out 0.3s both;
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
}

.card h2 {
  margin: 0 0 20px;
  font-size: 22px;
  font-weight: 700;
  color: #f3f4f6;
  letter-spacing: -0.3px;
}

.label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #cbd5e1;
  margin: 16px 0 8px;
  letter-spacing: 0.2px;
}

.input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.3);
  color: #e5e7eb;
  padding: 14px 16px;
  outline: none;
  resize: vertical;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.input:focus {
  border-color: rgba(129, 140, 248, 0.5);
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input::placeholder {
  color: #6b7280;
}

.range {
  width: 100%;
  margin-top: 12px;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  -webkit-appearance: none;
  transition: all 0.3s ease;
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #818cf8, #a5b4fc);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(129, 140, 248, 0.4);
  transition: all 0.2s ease;
}

.range::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 6px 16px rgba(129, 140, 248, 0.6);
}

.range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #818cf8, #a5b4fc);
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 12px rgba(129, 140, 248, 0.4);
  transition: all 0.2s ease;
}

.range::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 6px 16px rgba(129, 140, 248, 0.6);
}

.row {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 8px;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.btn {
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn:hover::before {
  width: 300px;
  height: 300px;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}

.btn.secondary {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn.secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.hint {
  margin-top: 16px;
  font-size: 13px;
  color: #9ca3af;
  line-height: 1.5;
}

.hint code {
  display: inline-block;
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #a5b4fc;
  word-break: break-all;
  font-size: 12px;
  font-family: 'Courier New', monospace;
}

.error {
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  font-size: 14px;
  animation: fadeIn 0.3s ease-out;
}

.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 2px dashed rgba(129, 140, 248, 0.2);
  min-height: 300px;
  animation: fadeIn 0.5s ease-out;
  transition: all 0.3s ease;
}

.preview:hover {
  border-color: rgba(129, 140, 248, 0.4);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
}

.preview :deep(svg) {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.preview:hover :deep(svg) {
  transform: scale(1.05);
}

.empty {
  padding: 48px 24px;
  text-align: center;
  color: #9ca3af;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 2px dashed rgba(255, 255, 255, 0.1);
  font-size: 16px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.footer {
  max-width: 1100px;
  margin: 32px auto 0;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #6b7280;
  font-size: 13px;
  text-align: center;
  animation: fadeIn 0.6s ease-out 0.4s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@media (max-width: 768px) {
  .page {
    padding: 24px 16px;
  }
  
  .header h1 {
    font-size: 32px;
  }
  
  .card {
    padding: 20px;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
