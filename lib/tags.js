exports = module.exports = {};

// exports.parse = function(args, defaults, replacements) {
//    var options = {};
//    if (typeof defaults === "object" && !(defaults instanceof Array)) {
//        options = defaults
//    }

//    if (typeof replacements === "object" && !(defaults instanceof Array)) {
//         for (var i in args) {
//              var arg = args[i];
//              if (arg.charAt(0) === "-" && arg.charAt(1) != "-") {
//                   arg = arg.substr(1);
//                   if (arg.indexOf("=") !== -1) {
//                       arg = arg.split("=");
//                       var keys = arg.shift();
//                       var value = arg.join("=");

//                       arg = keys.split("");
//                       var key = arg.pop();
//                       if (replacements.hasOwnProperty(key)) {
//                            key = replacements[key];
//                       }

//                       args.push("--" + key + "=" + value);
//                   } else {
//                       arg = arg.split("");
//                   }

//                   arg.forEach(function(key){
//                       if (replacements.hasOwnProperty(key)) {
//                           key = replacements[key];
//                       }
//                       args.push("--" + key);
//                   });
//              }
//         }
//    }

//    for (var i in args) {
//        var arg = args[i];
//        if (arg.substr(0, 2) === "--") {
//            arg = arg.substr(2);
//            if (arg.indexOf("=") !== -1) {
//                arg = arg.split("=");
//                var key = arg.shift();
//                var value = arg.join("=");

//                if (/^[0-9]+$/.test(value)) {
//                    value = parseInt(value, 10);
//                }
//                options[key] = value;
//            }else{
//                options[arg] = true;
//            }

//        }
//    }
// //    return options
//    return options
// }


//console.log(process.argv.slice(2))
exports = module.exports = {};
exports.parse = function(args, defaults, replacements){
  var result = {}, arg, i, temp, replaceFlag = false
  , longTagsReg  = /^--(\w+)\s*(=\s*([^\s]+))?/
  , shortTagsReg = /^-(\w+)\s*(=\s*([^\s]+))?/
  if (typeof defaults === "object" && !(defaults instanceof Array)) {
    result = defaults;
  }
  if (typeof replacements === "object" && !(replacements instanceof Array)) {
    replaceFlag = true;
  }
  for( i in args ){
    arg = args[i].match(longTagsReg)
    if(arg){
      if(arg[2]){
        result[arg[1]] = /^[\d]+$/.test(arg[3]) ? parseInt(arg[3], 10) : arg[3]
      }else{
        result[arg[1]] = true
      }
    }else if((arg = args[i].match(shortTagsReg)) && replaceFlag){
      var keys = arg[1].split('');
      if(arg[2]){
        var key = keys.pop()
        if(replacements.hasOwnProperty(key)){
          key = replacements[key];
        }
        result[key] = /^[\d]+$/.test(arg[3]) ? parseInt(arg[3], 10) : arg[3]
      }
      keys.forEach(function(key){
          if (replacements.hasOwnProperty(key)) {
              key = replacements[key];
          }
          result[key] = true
      });

    }
  }
  return result;
}
