async function findPagination(Model, pageAsNumber, sizeAsNumber){
  try {
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0 ) {
        page = pageAsNumber - 1;
    }

    let size = 3;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
        size = sizeAsNumber;
    }

    const users = await Model.findAndCountAll({
      limit: size,
      offset: size * page,
    })
  return users
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = findPagination;