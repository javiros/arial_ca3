describe("signup", function() {

    it("firstname should not should not be empty", function(){
        expect(function() {User.signup("password")}).toThrow(new Error("login field empty"));
    });

    it("email should not should not be empty", function(){
        expect(function() {User.signup("example@mail.com")}).toThrow(new Error("email field empty"));
    });

    it("password should not should not be empty", function(){
        expect(function() {User.signup("password")}).toThrow(new Error("password field empty"));
    });

    it("password should be longer than 7 characters", function(){
        expect(function() {User.signup("password")}).toBeGreaterThan(7);
    });
});/**
 * Created by Paul on 28/04/14.
 */
