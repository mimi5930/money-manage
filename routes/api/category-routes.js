const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then((dbCategoryData) => {
      res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
    .then((dbCategoryData) => {
      res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  /* expects:
  {
    category_name: 'sports_equipment'
  }
  */
  Category.create(req.body)
    .then((newCat) => {
      res.json(newCat);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
