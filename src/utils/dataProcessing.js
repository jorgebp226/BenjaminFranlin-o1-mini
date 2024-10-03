export const getVirtudRating = (semanaList, virtudes) => {
    const data = semanaList.map(semana => {
      const semanaLabel = semana.semana;
      const ratings = {};
      virtudes.forEach(virtud => {
        const total = semana.dias.reduce((acc, dia) => {
          const virtudDia = dia.virtudes.find(v => v.idVirtud === virtud.id);
          return acc + (virtudDia ? virtudDia.estado : 0);
        }, 0);
        ratings[virtud.nombre] = total;
      });
      return { semana: semanaLabel, ...ratings };
    });
    return data;
  };
  