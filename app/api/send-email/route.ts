import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, interest, message } = await request.json();

    // Construir el mensaje de email
    const emailContent = `
Nueva solicitud de cotización de Equipales Caudel:

Nombre: ${name}
Teléfono: ${phone}
Email: ${email}
Interés: ${interest}
Mensaje: ${message}

Fecha: ${new Date().toLocaleString("es-MX")}
    `;

    // Crear el enlace mailto
    const mailtoLink = `mailto:caudellesly@gmail.com?subject=Nueva Cotización - ${name}&body=${encodeURIComponent(
      emailContent
    )}`;

    return NextResponse.json({
      success: true,
      mailtoLink,
      message: "Email preparado correctamente",
    });
  } catch (error) {
    console.error("Error processing email:", error);
    return NextResponse.json(
      { success: false, message: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
