async function findPagination(sequelize, sizeAsNumber,pageAsNumber, query){
  try {
    /**
     * validamos si el parametro page es un numero y si es mayor a cero, 
     * si es así se resta uno para la consulta 
     */
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0 ) {
        page = pageAsNumber - 1;
    }
    /**
     * size será 10 por defecto, si se ingresa un numero distinto page será ese numero
     */
    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber <= 10) {
        size = sizeAsNumber;
    }

    /**
     * para decirle a la bd desde donde traer los registros multiplicamos ambos parametros
     * ademas validamos si nos entregan un query, en caso de que no hará la consulta sin 
     * condiciones
     */
    const offset = page*size;

    if(query){
      
      const pages = await sequelize.query(`${query} LIMIT ${offset},${size}`);
      return pages[0];
    }
    const pages = await sequelize.query(`SELECT * FROM ${tablename} LIMIT ${offset},${size}`)
    return pages[0];

  } catch (error) {
      throw new Error(error.message);
  }
}

module.exports = findPagination;