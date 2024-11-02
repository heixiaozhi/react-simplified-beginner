function checkEmail(email) {
  let ans = [];
  if (email.length === 0) {
    ans.push("required");
  }
  if (!email.endsWith("@webdevsimplified.com")) {
    ans.push("Must end in @webdevsimplified.com");
  }
  return ans;
}

function checkPassword(password) {
  let ans = [];
  if (password.length === 0) ans.push("Required (Cannot be blank)");
  if (!(password.length >= 10)) ans.push("Must Be 10 characters or longer");
  // 正则语法 str.match(regexp) regexp = new RegExp 或 /pattern/
  // 全局匹配任何数字，match当有返回一个数组，没用返回null
  if (!password.match(/\d/)) ans.push("Must include a number");
  if (!password.match(/[a-z]/)) ans.push("Must include a lowercase letter");
  if (!password.match(/[A-Z]/)) ans.push("Must include an uppercase letter");
  return ans;
}

export { checkEmail, checkPassword };
