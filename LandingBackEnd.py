from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Permitimos CORS para que la IP del celular pueda comunicarse con el puerto 5000
CORS(app)

@app.route('/api/solicitar', methods=['POST'])
def solicitar():
    data = request.get_json()
    
    if not data:
        return jsonify({"message": "No se recibieron datos."}), 400
        
    cargo = data.get('cargo', '')
    pais = data.get('pais', '')
    
    if not cargo or not pais:
        return jsonify({"message": "Faltan parámetros requeridos (cargo o pais)."}), 400
        
    mensaje = f"Hemos recibido tu solicitud de headhunting para el perfil de '{cargo}' en la región de {pais}. La IA está buscando candidatos ideales."
    
    return jsonify({
        "message": mensaje,
        "cargo": cargo,
        "pais": pais
    }), 200

if __name__ == '__main__':
    print("Iniciando el Backend en 0.0.0.0:5000 para acceso local...")
    # Escucha en todas las interfaces de red locales
    app.run(host='0.0.0.0', port=5000, debug=True)