const PriceByVolumeService = require('./service');


async function findAll(req, res, next) {
  try {
    const PriceByVolumes = await PriceByVolumeService.findAll(req.headers['authorization'])
    res.status(PriceByVolumes.status).json(PriceByVolumes.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getPriceByVolume = await PriceByVolumeService.create(req.headers['authorization'],req.body);
    res.status(getPriceByVolume.status).json(getPriceByVolume.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getPriceByVolume = await PriceByVolumeService.findOne(req.headers['authorization'],req.params.id)
    res.status(getPriceByVolume.status).json(getPriceByVolume.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const PriceByVolume = await PriceByVolumeService.delete(req.headers['authorization'],req.params.id)
    res.status(PriceByVolume.status).json(PriceByVolume.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const PriceByVolume = await PriceByVolumeService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(PriceByVolume.status).json(PriceByVolume.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const PriceByVolumes = await PriceByVolumeService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(PriceByVolumes.status).json(PriceByVolumes.message)   
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = {
  findAll,
  create,
  findOne,
  deleteOne,
  updateOne,
  findpagination
}