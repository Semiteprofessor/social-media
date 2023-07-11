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
  ret = "";
  offset = parseInt(block.hash.limit) || 0;
  limit = parseInt(block.hash.limit) || 5;
  i = offset < context;
};
