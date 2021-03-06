/*
 * Copyright (c) 2018 Rain Agency <contact@rain.agency>
 * Author: Rain Agency <contact@rain.agency>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { expect } from "chai";
import fs from "fs-extra";
import path from "path";
import { configurations } from "./mocha.spec";

configurations.forEach(interaction => {
  describe(`${interaction.name} Views`, () => {
    let views: any;
    before(async function before() {
      if (interaction.skip) {
        return this.skip();
      }

      const viewsPath = path.join(
        path.dirname(interaction.interactionFileName),
        interaction.viewsPath,
        "views.json"
      );

      views = JSON.parse((await fs.readFile(viewsPath)).toString());
    });

    it("should generate an en-US Launch.say", () => {
      expect(views["en-US"].translation.Launch).to.deep.equal({
        say: ["Hello World!", "Hi World!"]
      });
    });
  });
});
