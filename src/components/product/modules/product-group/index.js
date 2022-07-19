const { HttpResponse } = require('aws-sdk');
const ProductGroupService = require('./service');


async function findAll(req, res) {
  try {
    const ProductGroups = await ProductGroupService.findAll(req.headers['authorization'])
    res.status(ProductGroups.status).json(ProductGroups.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getProductGroup = await ProductGroupService.create(req.headers['authorization'],req.body);
    res.status(getProductGroup.status).json(getProductGroup.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    const getProductGroup = await ProductGroupService.findOne(req.headers['authorization'],req.params.id)
    res.status(getProductGroup.status).json(getProductGroup.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const ProductGroup = await ProductGroupService.delete(req.headers['authorization'],req.params.id)

    res.status(ProductGroup.status).json(ProductGroup.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductGroup = await ProductGroupService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(ProductGroup.status).json(ProductGroup.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const ProductGroups = await ProductGroupService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(ProductGroups.status).json(ProductGroups.message)    
  } catch (error) {
    throw new HttpResponse(400, error.message)
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