var timereg = /^\s*(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})\s*$/;
exports.parse = function(data) {
  if (!data) return '';

  var cache = data.split(/\r|\n|\r\n/);
  var ret = [], block = {};
  cache.forEach(function(o) {
    if (!block.num) {
      if (/^\d+$/.test(o)) {
        block.num = Number(o);
      }
      return;
    }

    if (!(block.begin && block.end)) {
      var m = o.match(timereg);
      if (m) {
        block.begin = m[1];
        block.end = m[2];
      }
      return;
    }

    var content = o.replace(/^\s*|\s*$/g, '');
    if (content === '') {
      ret.push(block);
      block = {};
    } else {
      if (!block.content) block.content = [];
      block.content.push(content);
    }
  });
  return ret;
};

exports.stringify = function(data) {
  if (!data) return [];

  var ret = [];
  data.forEach(function(o) {
    ret.push(o.num);
    ret.push([o.begin, ' --> ', o.end].join(''));
    o.content.forEach(function(content) {
      ret.push(content);
    });
    ret.push('');
  });
  return ret.join('\n');
};

