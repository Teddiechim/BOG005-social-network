import { changeRoute } from "../../src/lib/router.js";
import { registerWithEmail } from "../../src/__mocks__/auth.js";
import { getPosts } from "../../src/__mocks__/firestore.js";
import homeSection from "../../src/lib/views/home.js";
import registerSection from "../../src/lib/views/register.js";
import feedSection from "../../src/lib/views/feed.js";

jest.mock("../../src/auth.js");
jest.mock("../../src/firestore.js");

describe("Root", () => {
  it("Change a register root", () => {
    document.body.innerHTML = '<div id="content"></div>';
    const result = changeRoute("#register");
    expect(result.querySelector(".registerTitle").innerHTML).toBe("Regístrate");
  });
});

describe("buttons", () => {
  it("Button create a account exist", () => {
    const element = homeSection();
    const button = element.querySelector(".loginButton");
    expect(button).not.toBeNull();
  });
});

// describe("Authentication", () => {
//   it("User is register", () => {
//     const element = registerSection();
//     const email = element.querySelector("#correo");
//     const password = element.querySelector("#password");
//     const button = element.querySelector(".submitRegister");
//     email.value = "gamba@gamil.com";
//     password.value = "123456";
//     button.addEventListener("click", () => {
//       registerWithEmail(email.value, password.value);
//     });
//     button.click();
//     button.dispatchEvent(new Event("click"));
//     expect(registerWithEmail).toHaveBeenCalled();
//     expect(registerWithEmail).toHaveBeenLastCalledWith(
//       "gamba@gamil.com",
//       "123456"
//     );
//   });
// });

describe("Firestore", () => {
  it("Pintar un post cuando hay un sólo post", () => {
    getPosts();
    setTimeout(() => {
      const element = feedSection();
      const posts = element.querySelector(".postsContainer");
      expect(posts.children.length).toBe(1);
    }, 1000);
  });
});
