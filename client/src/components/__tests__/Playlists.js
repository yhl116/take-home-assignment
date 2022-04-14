import React from "react";
import Playlists from "../Playlists";
import renderer from "react-test-renderer";

jest.mock("../../services/GetAllPlaylists");


describe("The playlists", () => {
    it("should match the snapshot", () => {
        const tree = renderer
            .create(<Playlists />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
