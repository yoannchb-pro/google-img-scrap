# Changelog

### 1.1.1

- Fixed empty result

### 1.1.0

- Added google image inverse search engine. You can now search images with a local image or with an image url.

### 1.0.9

- Fixed many bugs
- `filterByTitles` is now working
- `urlMatch` added in types
- All the code have been write back in typescript with a new structure
- Removed `execute`
- Added `proxy` configuration
- Writed back all test with jest

### 1.0.8

- Fixed "ERROR: Cannot assign to "queryName" because it is a constant" (by GaspardCulis)
- Removed gstatic url
- Added average color, id, title and originalUrl

### 1.0.7

- Readme update

### 1.0.6

- Fixed types
- Added `limit` to limit the size of the results

### 1.0.5

- Added types (by christophe77)

### v1.0.4

- New option `urlMatch`. You now get image when an url match a string (example: "cdn")
- New option `filterByTitles`. Filter images by titles

### v1.0.3

- New option `execute`. allow you to execute a function to remove "gstatic.com" domains for example

### v1.0.2

- Cannot set 'domains' and 'excludeDomains' as same time
- Fixed some bugs
- New option `excludeWords`

### v1.0.1

- Added the missing dependencie
