/**
 * 只允許包含的內容
 * @param { Any } value
 * @param { Array } validList
 */
export const oneOf = (value, validList) => validList.includes(value);

/**
 * 是否為 Array
 * @param { Array } arr
 * @returns { Boolean }
 */
export const isArray =
  Array.isArray ||
  function(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  };

/**
 * 檢查是否為Object
 * @param { * } value
 * @returns { Boolean }
 */
export const isObject = value =>
  Object.prototype.toString.call(value) === "[object Object]";

/**
 * 是否為 Function
 * @param { Function } fn
 * @returns { Boolean }
 */
export const isFunction = fn => !!(fn && fn.constructor && fn.call && fn.apply);

/**
 * 轉換為FormData格式
 * @param { Object } Params
 */
export const ToFormData = Params => {
  const data = new FormData();
  Object.keys(Params).forEach(key => {
    if (isArray(Params[key])) {
      if (Params[key].length !== 0)
        Params[key].forEach(v => data.append(key, v));
    } else data.append(key, Params[key]);
  });
  return data;
};

/**
 * 將Error code 去除 substring 後字元
 * @param { String } code
 * @param { String } substring
 */
export const FormatCode = (code, substring) =>
  code.includes(substring) ? code.substr(0, code.indexOf(substring)) : code;

/**
 * 找出陣列內 相同/不相同 對象
 * @param { Function } f
 * @param { Array } xs
 * @param { Array } ys
 */
export const intersectwith = (f, xs, ys) =>
  xs.filter(x => ys.some(y => f(x, y)));

/**
 * 比較兩值是否相同
 * @param { Any } x
 * @param { Any } y
 */
export const equals = (x, y) => x === y;

/**
 * 是否大於
 * @param { Any } x
 * @param { Any } y
 */
export const gt = (x, y) => x > y;

/**
 * 是否大於等於
 * @param { Any } x
 * @param { Any } y
 */
export const gte = (x, y) => x >= y;

/**
 * 是否小於
 * @param { Any } x
 * @param { Any } y
 */
export const lt = (x, y) => x < y;

/**
 * 是否小於等於
 * @param { Any } x
 * @param { Any } y
 */
export const lte = (x, y) => x <= y;

/**
 * 檢查Object裡是否有key參數值
 * @param { Object } object
 * @param { String } key
 */
export const Has = (object, key) =>
  object != null && Object.hasOwnProperty.call(object, key);

/**
 * 添加斜線
 * @param { String } str
 */
export const Slash = (str = "") => `/${str}`;

/**
 * 合併字串
 * @param { String } str
 */
export const MergeStr = (...str) => str.reduce((prev, curr) => (prev += curr));

/**
 * 檢查是否為Number
 * @param { Number } num
 */
export const isNumber = num =>
  !isNaN(num) &&
  typeof num !== "object" &&
  num !== Number.POSITIVE_INFINITY &&
  num !== Number.NEGATIVE_INFINITY;

/**
 * 檢查是否為空
 * @param { * } value
 */
export const isEmpty = value => {
  if (value == null) return true;
  if (isArray(value)) {
    value.forEach(x => {
      if (isObject(x)) return !Object.keys(x).length;
      return !x;
    });
    // for (const x of value) {
    //   if (isObject(x)) return !Object.keys(x).length;
    //   return !x;
    // }
    return !value.length;
  }
  if (typeof value === "string") return !value.length;
  if (isObject(value)) return !Object.keys(value).length;
  if (!isNaN(value)) return false;
  return true;
};

/**
 * Delete all null, undefined, '' properties from an object.
 * @param { Object } obj
 */
export const RemoveEmptyValues = obj => {
  if (!isObject(obj)) return {};
  Object.entries(obj).forEach(([key, val]) => {
    if (val && isObject(val)) RemoveEmptyValues(val);
    else if (isEmpty(val)) delete obj[key];
  });
  return obj;
};

/**
 * Object 轉換為 query
 * @param { Object } obj
 */
export const ToQuerystr = obj => {
  if (!obj) return "";
  obj = RemoveEmptyValues(obj);
  return `?${Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .join("&")}`;
};

/**
 * @param { Array } Roles
 * @param { Array } ArrayVal
 * @param { Object } Obj
 * @param { String } role
 * @param { String } key
 */
const Nesting = (Roles, ArrayVal, Obj, role, key) => {
  if (!intersectwith(equals, Roles, ArrayVal).length) {
    return ArrayVal.map(v => `${v}_${key}`);
  }
  const [SameKey] = intersectwith(equals, Roles, ArrayVal);
  const NewArrayVal = ArrayVal.filter(val => val !== SameKey).concat(
    Obj[SameKey][key]
  );
  return Nesting(Roles, NewArrayVal, Obj, role, key);
};

/**
 * 扁平化 Object
 * @param { Object } Obj
 */
export const factory = Obj => {
  const Roles = Object.keys(Obj);
  const GrantsObj = {};
  Roles.forEach(role => {
    GrantsObj[role] = [];
    Object.keys(Obj[role]).forEach(key => {
      GrantsObj[role] = GrantsObj[role].concat(
        Nesting(Roles, Obj[role][key], Obj, role, key)
      );
    });
  });
  return GrantsObj;
};

/**
 * 找 Array 裡是否有Obj key
 * @param { Array } arr
 */
export const FindKey = (arr, key) => {
  if (!isArray(arr)) {
    return false;
  }
  return arr.find(val => Has(val, key));
};

/**
 * 找出陣列裡的條件下的對象
 * @param { Array } arr
 * @param { Object } obj
 */
export const FindValue = (arr, obj) => {
  const [[key, value]] = Object.entries(obj);
  if (FindKey(arr, key)) return arr.find(item => equals(item[key], value));
  return false;
};

export const defer = fn => Promise.resolve().then(fn);
