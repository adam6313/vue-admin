/* eslint-disable */
const fs = require('fs');
const lang_package = require('./language');
const dir = 'locales';
const country = ['zh', 'en'];

// --- Create Folder
const Create = (dir, callback) => {        
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(`${__dirname}/${dir}`);
  }
  callback(country);
};

// --- Create Folder to a Relative language package
Create(dir, Item => {
    // Item.forEach((item) => {
    //     let path = `${__dirname}/${dir}/${item}`;
    //     if (!fs.existsSync(path)) {
    //         fs.mkdirSync(path);
    //       }
    // }, this);
});

// --- Analysis object, Using recursive method
const fn = (obj, index, content_) => {
  let str = '';
  if (Array.isArray(obj)) {
    str += `'${obj[index]}',`;
  } else {
    Object.keys(obj).forEach(next_obj => {
      if (Number(next_obj) < 0) {
        str += `'${next_obj}':${fn(obj[next_obj],index, content_, next_obj)}`;
      } else {
        str += `${next_obj}:${fn(obj[next_obj],index, content_, next_obj)}`;
      }
    })
    str =  `{${str}},`;
  }
  return content_ += str;
} 

// --- loop Language Items and write content in to file
country.forEach(langItem => {
  let content = '';
  let content_ = '';
  if(Object.keys(lang_package).length) {
    content = fn(lang_package, langItem, content_);
  }
  content = (content.substr(0, content.length - 1))
  fs.writeFile(`${__dirname}/${dir}/${country[langItem]}.js`, `/* eslint-disable */  export default (${content})`, 'utf8', function (err) {});
});
