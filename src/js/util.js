function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getjson() {
    // 保存するJSONファイルの名前
    const fileName = "mochi.json";

    // データをJSON形式の文字列に変換する。
    const data = JSON.stringify({AAA: "BVVV"});

    // HTMLのリンク要素を生成する。
    const link = document.createElement("a");

    // リンク先にJSON形式の文字列データを置いておく。
    link.href = "data:text/plain," + encodeURIComponent(data);

    // 保存するJSONファイルの名前をリンクに設定する。
    link.download = fileName;

    // ファイルを保存する。
    link.click();
}

/**
 * 同期的なmap
 *
 * @param {*} array
 * @param {*} operation
 */
async function asyncMap(array, operation) {
    return Promise.all(array.map(async item => await operation(item)));
}

/**
 * 同期的なfilter
 *
 * @param {*} array
 * @param {*} asyncCallback
 */
async function asyncFilter(array, asyncCallback) {
    const bits = await asyncMap(array, asyncCallback);
    return array.filter((_, i) => bits[i]);
}

/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
 */
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/* creating ordinal numbers (1st, 2nd, 3rd 4th etc) (vs. cardinal 1, 2, 3, 4) */
function getGetOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Enumの実装クラス
 * doc https://qiita.com/dich1/items/4878ba4b089b3fe7ff30
 * ===========================================================
 */
Enum = function () {
    this._enums = [];
    this._lookups = {};
};

/**
 * enumを取得する
 * @return {array} enumオブジェクト
 */
Enum.prototype.getEnums = function () {
    return _enums;
};

/**
 * 繰り返し処理する
 * @param {array} callback コールバック
 */
Enum.prototype.forEach = function (callback) {
    var length = this._enums.length;
    for (var i = 0; i < length; ++i) {
        callback(this._enums[i]);
    }
};

/**
 * enumを追加する
 * @param {object} e enumの追加情報
 */
Enum.prototype.addEnum = function (e) {
    this._enums.push(e);
};

/**
 * 名前を取得する
 * @param {string} name 名前
 * @return {string} 名前文字列
 */
Enum.prototype.getByName = function (name) {
    return this[name];
};

/**
 * 値を取得する
 * @param  {string} field フィールド
 * @param  {object} value 値
 * @return {object} 設定した値
 */
Enum.prototype.getByValue = function (field, value) {
    var lookup = this._lookups[field];
    if (lookup) {
        // do nothing
    } else {
        this._lookups[field] = lookup = {};
        var k = this._enums.length - 1;
        var match;
        for (; k >= 0; --k) {
            var m = this._enums[k];
            var j = m[field];
            lookup[j] = m;
        }
    }
    return lookup[value]; // customized
};

/**
 * Enumを定義する
 * @param  {object} definition 定義内容
 * @return {object} enum
 */
function defineEnum(definition) {
    var k;
    var e = new Enum();
    for (k in definition) {
        var j = definition[k];
        e[k] = j;
        e.addEnum(j);
    }
    return e;
}

/**=========================================================== */
