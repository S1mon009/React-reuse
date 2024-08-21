import "@testing-library/jest-dom";
import "css.escape";
import { expect } from "vitest";
import * as extensions from "@testing-library/jest-dom/matchers";

expect.extend(extensions);
