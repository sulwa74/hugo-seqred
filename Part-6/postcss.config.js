const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./hugo_stats.json'],
    defaultExtractor: content => {
      const els = JSON.parse(content).htmlElements;
      return [
        ...(els.tags || []),
        ...(els.classes || []),
        ...(els.ids || []),
      ];
    },
    safelist: [
                '*',
                'root',
                'body',
               'show', 
               'bg-primary', 
               'carousel', 
               'slide', 
               'carousel-indicators', 
               'active',
               'carousel-inner',
               'carousel-item',
               'carousel-item-next',
               'carousel-item-prev',
               'carousel-item-end',
               'carousel-item-start', 
               'carousel-control-prev', 
               'carousel-control-next',
               'carousel-control-prev-icon',
               'carousel-control-next-icon', 
               'carousel-caption',
               'pointer-event',
               'visually-hidden', 
               'data-bs-target',
               'button',
               'btn'
              ],
});

const cssnano = require('cssnano')({
    preset: 'default'
});

module.exports = {
    plugins: [
      ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss, cssnano] : [cssnano])
    ]
  };