import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

console.log('=== DIAGNÓSTICO COMPLETO MongoDB ===\n');

// 1. Verificar variables de entorno
console.log('📋 1. VARIABLES DE ENTORNO:');
console.log('MONGO_DB_URI:', process.env.MONGO_DB_URI);
console.log('MONGO_DB_USER:', `"${process.env.MONGO_DB_USER}"`);
console.log('MONGO_DB_PASSWORD:', `"${process.env.MONGO_DB_PASSWORD}"`);
console.log('MONGO_DB_NAME:', `"${process.env.MONGO_DB_NAME}"`);

console.log('\n📏 2. LONGITUDES (detectar espacios):');
console.log('Usuario length:', process.env.MONGO_DB_USER?.length);
console.log('Password length:', process.env.MONGO_DB_PASSWORD?.length);
console.log('DB Name length:', process.env.MONGO_DB_NAME?.length);

// 3. Construir URI
const user = process.env.MONGO_DB_USER?.trim();
const password = process.env.MONGO_DB_PASSWORD?.trim();
const dbName = process.env.MONGO_DB_NAME?.trim();

const encodedUser = encodeURIComponent(user);
const encodedPassword = encodeURIComponent(password);
const encodedName = encodeURIComponent(dbName);

const dbURI = process.env.MONGO_DB_URI
    .trim()
    .replace('<db_username>', encodedUser)
    .replace('<db_password>', encodedPassword)
    .replace('<db_name>', encodedName);

console.log('\n🔗 3. URI CONSTRUIDA:');
console.log(dbURI);

// 4. Intentar conexiones con diferentes métodos
console.log('\n🧪 4. PRUEBAS DE CONEXIÓN:\n');

// Prueba 1: URI completa directa (sin variables)
console.log('Prueba 1: URI directa sin variables...');
const directURI = `***REMOVED***?appName=ClusterAngel`;
try {
    await mongoose.connect(directURI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    });
    console.log('✅ PRUEBA 1 EXITOSA - El problema está en las variables de entorno');
    await mongoose.disconnect();
} catch (error) {
    console.log('❌ PRUEBA 1 FALLÓ:', error.message);
    console.log('   Código:', error.code);
}

// Prueba 2: URI construida desde variables
console.log('\nPrueba 2: URI construida desde variables...');
try {
    await mongoose.connect(dbURI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    });
    console.log('✅ PRUEBA 2 EXITOSA - Las variables están bien configuradas');
    await mongoose.disconnect();
} catch (error) {
    console.log('❌ PRUEBA 2 FALLÓ:', error.message);
    console.log('   Código:', error.code);
}

// Prueba 3: Sin authSource
console.log('\nPrueba 3: Agregando authSource=admin...');
const uriWithAuth = dbURI + '&authSource=admin';
try {
    await mongoose.connect(uriWithAuth, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    });
    console.log('✅ PRUEBA 3 EXITOSA - Necesitas authSource=admin');
    await mongoose.disconnect();
} catch (error) {
    console.log('❌ PRUEBA 3 FALLÓ:', error.message);
}

console.log('\n=== FIN DEL DIAGNÓSTICO ===');
process.exit(0);