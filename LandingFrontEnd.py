import sys
import os
from django.conf import settings
from django.urls import path
from django.http import HttpResponse
from django.core.management import execute_from_command_line

# --- CONFIGURACIÓN DE DJANGO (Single File Mode) ---
if not settings.configured:
    settings.configure(
        DEBUG=True,
        SECRET_KEY='ayuda-estrategica-secret-key',
        ROOT_URLCONF=__name__,
        ALLOWED_HOSTS=['*'],  # Permite acceder desde el celular usando la IP local de tu PC
        TEMPLATES=[{
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
        }],
    )

# --- VISTA DE LA LANDING PAGE ---
def index(request):
    html_content = """
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ayuda Estratégica - Headhunting IA</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <style>
            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .animate-scroll { display: flex; width: max-content; animation: scroll 30s linear infinite; }
            .glass { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); }
        </style>
    </head>
    <body class="bg-slate-50 text-slate-900 font-sans">

        <!-- Navegación -->
        <nav class="fixed w-full z-50 glass border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="bg-blue-700 text-white p-2 rounded-xl shadow-lg">
                        <i class="fas fa-briefcase text-xl"></i>
                    </div>
                    <span class="text-xl font-bold text-blue-900">Ayuda Estratégica</span>
                </div>
                
                <!-- Menú Desktop -->
                <div class="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-tight">
                    <a href="#" class="text-slate-600 hover:text-blue-700">Servicios</a>
                    <div class="bg-slate-100 p-1 rounded-full px-4 flex items-center gap-2">
                        <span class="text-[10px] text-slate-400">Región:</span>
                        <select id="paisSelect" onchange="document.getElementById('paisSelectMobile').value = this.value" class="bg-transparent border-none outline-none text-slate-700 cursor-pointer">
                            <option value="Colombia">🇨🇴 Colombia</option>
                            <option value="México">🇲🇽 México</option>
                        </select>
                    </div>
                    <a href="#contacto" class="bg-blue-700 text-white px-6 py-2.5 rounded-full hover:bg-blue-800 transition shadow-lg shadow-blue-200">Contratar</a>
                </div>

                <!-- Botón Hamburguesa (Móvil) -->
                <div class="md:hidden flex items-center">
                    <button onclick="toggleMobileMenu()" class="text-slate-700 hover:text-blue-700 focus:outline-none">
                        <i id="menuIcon" class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>

            <!-- Menú Desplegable (Móvil) -->
            <div id="mobileMenu" class="hidden md:hidden glass border-b border-slate-200 px-6 py-4 flex flex-col gap-4 text-sm font-bold uppercase tracking-tight">
                <a href="#" onclick="toggleMobileMenu()" class="text-slate-600 hover:text-blue-700 py-2">Servicios</a>
                <div class="bg-slate-100 p-2 rounded-xl flex items-center justify-between">
                    <span class="text-xs text-slate-400">Región:</span>
                    <select id="paisSelectMobile" onchange="document.getElementById('paisSelect').value = this.value" class="bg-transparent border-none outline-none text-slate-700 cursor-pointer">
                        <option value="Colombia">🇨🇴 Colombia</option>
                        <option value="México">🇲🇽 México</option>
                    </select>
                </div>
                <a href="#contacto" onclick="toggleMobileMenu()" class="bg-blue-700 text-white text-center px-6 py-2.5 rounded-full hover:bg-blue-800 transition shadow-lg shadow-blue-200">Contratar</a>
            </div>
        </nav>

        <!-- Hero -->
        <header class="pt-48 pb-20 px-6 text-center">
            <h1 class="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
                Headhunting de <br><span class="text-blue-700 italic">Nueva Generación</span>
            </h1>
            <p class="text-lg sm:text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                Especialistas en cargos críticos para el sector Salud y Legal en Latinoamérica.
            </p>
            
            <!-- Buscador Inteligente -->
            <div id="contacto" class="max-w-2xl mx-auto bg-white p-3 rounded-3xl shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-2">
                <input type="text" id="cargoInput" placeholder="¿Qué cargo necesitas? (Ej: Médico General)" 
                       class="flex-1 px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 text-lg">
                <button onclick="enviarAlBackend()" class="bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-800 transition">
                    Activar IA
                </button>
            </div>
            
            <div id="responseMsg" class="hidden mt-6 p-4 max-w-2xl mx-auto rounded-2xl text-sm font-bold animate-pulse"></div>
        </header>

        <!-- Marquee de Clientes -->
        <div class="py-12 bg-white border-y border-slate-100 overflow-hidden">
            <div class="animate-scroll">
                <div class="flex gap-20 items-center px-10 grayscale opacity-40 text-lg md:text-2xl">
                    <span class="font-black">MEDYCARE</span>
                    <span class="font-black">CLÍNICA DE OBESIDAD</span>
                    <span class="font-black">DHI GLOBAL</span>
                    <span class="font-black">G. JURÍDICO DEUDU</span>
                    <span class="font-black">TRANSPORTES RINCÓN</span>
                    <span class="font-black">BIO-ESTÉTICA</span>
                    <!-- Repetición -->
                    <span class="font-black">MEDYCARE</span>
                    <span class="font-black">CLÍNICA DE OBESIDAD</span>
                    <span class="font-black">DHI GLOBAL</span>
                </div>
            </div>
        </div>

        <script>
            function toggleMobileMenu() {
                const menu = document.getElementById('mobileMenu');
                const icon = document.getElementById('menuIcon');
                if (menu.classList.contains('hidden')) {
                    menu.classList.remove('hidden');
                    icon.className = 'fas fa-xmark text-2xl';
                } else {
                    menu.classList.add('hidden');
                    icon.className = 'fas fa-bars text-2xl';
                }
            }

            async function enviarAlBackend() {
                const cargo = document.getElementById('cargoInput').value;
                const pais = document.getElementById('paisSelect').value;
                const responseMsg = document.getElementById('responseMsg');

                if (!cargo) {
                    alert("Por favor, ingresa un cargo.");
                    return;
                }

                responseMsg.classList.remove('hidden');
                responseMsg.className = "mt-6 p-4 max-w-2xl mx-auto rounded-2xl text-sm font-bold bg-blue-50 text-blue-700 block";
                responseMsg.innerText = "Sincronizando con el Backend (Flask)...";

                try {
                    // Obtiene dinámicamente la IP de la computadora desde la que se sirve la página
                    const hostIp = window.location.hostname;
                    const response = await fetch(`http://${hostIp}:5000/api/solicitar`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cargo: cargo, pais: pais })
                    });

                    const result = await response.json();

                    if (response.ok) {
                        responseMsg.className = "mt-6 p-4 max-w-2xl mx-auto rounded-2xl text-sm font-bold bg-green-100 text-green-700 block";
                        responseMsg.innerText = "¡CONEXIÓN EXITOSA! " + result.message;
                    } else {
                        throw new Error(result.message);
                    }
                } catch (error) {
                    responseMsg.className = "mt-6 p-4 max-w-2xl mx-auto rounded-2xl text-sm font-bold bg-red-100 text-red-700 block";
                    responseMsg.innerText = "Error de conexión con el Backend: " + error.message;
                }
            }
        </script>
    </body>
    </html>
    """
    return HttpResponse(html_content)

# --- RUTAS ---
urlpatterns = [
    path('', index),
]

# --- EJECUCIÓN ---
if __name__ == '__main__':
    # Escucha en 0.0.0.0 para aceptar conexiones de otros dispositivos en la red
    execute_from_command_line([sys.argv[0], 'runserver', '0.0.0.0:8000'])