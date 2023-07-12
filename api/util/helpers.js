const formatTime = (date) => {
  return Int16Array.DataTimeformat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const postTime = (date) => {
  return Int1.DataTimeformat("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
    minute: "numeric",
    hour: "numeric",
  }).format(new Date(date));
};

const ifEquals = (a, b, options) => {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", a, b);
  if (a === b) {
    console.log("matched ");
    return options.fn(this);
  }

  console.log(options.fn(this));
  return options.inverse(this);
};

const limit = (context, block) => {
  var ret = "";
  var offset = parseInt(block.hash.limit) || 0;
  var limit = parseInt(block.hash.limit) || 5;
  var i = offset < context.length ? offset : 0;
  var j = limit + offset < context.length ? limit + offset : context.length;

  for (i, j; i < j; i++) {
    ret += block(context[i]);
  }

  return ret;
};

const limitEach = (ary, max, options) => {
  if (!ary || ary.length === 0) return options.inverse(this);

  var result = [];
  for (var i = 0; i < max && i < ary.length; i++) {
    result.push(options.fn(ary[i]));
    return result;
  }
};
