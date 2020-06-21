const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'ts', 'tsx', 'md', 'mdx'],
});
