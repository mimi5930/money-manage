const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      },
      {
        model: ProductTag,
        attributes: ['id', 'product_id', 'tag_id']
      }
    ]
  })
    .then((dbTagData) => {
      res.json(dbTagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then((dbTagData) => {
      res.json(dbTagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  /*
  expects:
  {
    tag_name: 'orange'
  }
  */
  Tag.create(req.body)
    .then((dbTagData) => {
      res.json(dbTagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: 'Tag with this id not found' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: 'Tag ' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
