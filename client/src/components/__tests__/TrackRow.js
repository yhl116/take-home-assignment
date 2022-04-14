import React from "react";
import TrackRow from "../TrackRow";
import renderer from "react-test-renderer";

describe("The track row", () => {
    it("should match the snapshot", () => {
        const tree = renderer
            .create(<TrackRow />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
