

describe("Video search", function() {

    it("search term should not be empty", function(){
        expect(function() {VideoData.searchForVideo("")}).toThrow(new Error("Search term is empty"))
    })
});