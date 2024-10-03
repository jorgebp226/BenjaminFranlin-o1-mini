export const crearDiasDeSemana = (virtudes) => {
    const dias = [];
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Lunes
    for (let i = 0; i < 7; i++) {
      const fecha = new Date(firstDayOfWeek);
      fecha.setDate(firstDayOfWeek.getDate() + i);
      dias.push({
        fecha: fecha.toISOString().split('T')[0],
        virtudes: virtudes.map(virtud => ({
          idVirtud: virtud.id,
          estado: 0
        }))
      });
    }
    return dias;
  };
  