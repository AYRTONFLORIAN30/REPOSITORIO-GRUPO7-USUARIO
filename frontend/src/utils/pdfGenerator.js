import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getImageBase64 } from './imageToBase64'; // 🟡 debes crear este archivo
import logo from '../assets/TEConTime.png'; // ✅ ruta correcta de tu imagen

export async function exportarHorariosAPDF(eventos) {
  const doc = new jsPDF();

  // 📷 Cargar imagen del logo
  const logoBase64 = await getImageBase64(logo);
  doc.addImage(logoBase64, 'PNG', 150, 10, 40, 15); // (imagen, tipo, x, y, ancho, alto)

  // 📌 Título
  doc.setFontSize(18);
  doc.setTextColor(33, 37, 41); // Gris oscuro
  doc.text('Horarios Sincronizados', 14, 20);

  // 🕒 Fecha y hora
  const fecha = new Date().toLocaleDateString('es-PE');
  const hora = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Exportado el ${fecha} a las ${hora}`, 14, 27);

  // 🧾 Firma
  const firma = 'Exportado por Ayrton Leao Florian Astuhuamán';

  // 📊 Datos para la tabla
  const rows = eventos.map(evento => [
    evento.Clase || 'N/A',
    evento.Profesor || 'N/A',
    evento.Día || 'N/A',
    evento.Hora || 'N/A',
    evento.Aula || 'N/A',
  ]);

  // 🧷 Tabla
  autoTable(doc, {
    head: [['Clase', 'Profesor', 'Día', 'Hora', 'Aula']],
    body: rows,
    startY: 35,
    styles: {
      fontSize: 11,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [41, 128, 185], // azul fuerte
      textColor: 255,
      halign: 'center',
    },
  });

  // 🖊️ Firma final
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setTextColor(70);
  doc.setFontSize(10);
  doc.text(firma, 14, finalY);

  // 💾 Guardar el PDF
  doc.save('horarios_sincronizados.pdf');
}
