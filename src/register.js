import Vue from "vue";
const viewsChildrens = require.context(
  "./views/Dashboard",
  true,
  /[\w-]+\.vue$/
);
const ComponentChildrens = require.context(
  "./components",
  false,
  /[\w-]+\.vue$/
);
const ModuleChildrens = require.context("./store/modules", false, /\.js$/);

// register router
export const register_router = viewsChildrens.keys().map(key => {
  const fileName = key.replace(/^\.\//, "").replace(/\.\w+$/, "");
  return {
    path: fileName,
    name: fileName,
    component: () => import(`@/views/Dashboard/${fileName}`)
  };
});

// register components
ComponentChildrens.keys().forEach(fileName => {
  const componentConfig = ComponentChildrens(fileName);
  const componentName = fileName.replace(/^\.\//, "").replace(/\.\w+$/, "");
  Vue.component(componentName, componentConfig.default || componentConfig);
});

// register vuex modules
const modules = {};
ModuleChildrens.keys().forEach(fileName => {
  if (fileName === "./index.js") return;
  const moduleName = fileName.replace(/(\.\/|\.js)/g, "");
  modules[moduleName] = ModuleChildrens(fileName).default;
});
export { modules };

// register vuex modules
// export const register_modules = ModuleChildrens.keys().reduce((pre, cur) => {
//   const moduleName = cur.replace(/(\.\/|\.js)/g, '');
//   pre[moduleName] = ModuleChildrens(cur).default;
//   return pre;
// }, {});
// console.log(register_modules)
