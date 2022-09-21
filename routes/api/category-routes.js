//DONE !!

const router = require('express').Router();
const { Error } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [
        {model: Product}, 
        //should I also include category_id?
    ],
    });

    res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  // Catagory.findByAll()
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: Product
    });
    res.status(201).json(singleCategoryData);
  } catch (err) {
    res.stus(500).json(err);
  }
  // Catagory.findByPk( req.params.id )
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      ...req.body
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(500).json(err);
  }

  // Catagory.create(req.body)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).send(`<h1>${req.params.id} Updated!</h1>`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).send(`<h1>${req.params.id} Deleted!</h1>`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
