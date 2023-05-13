import { extendConfig, extendEnvironment } from "hardhat/config";
import { lazyObject } from "hardhat/plugins";
import path from "path";

import { ExampleHardhatRuntimeEnvironmentField } from "./ExampleHardhatRuntimeEnvironmentField";
import "./type-extensions";

extendConfig((config, userConfig) => {
    const userPath = userConfig.paths?.newPath;

    let newPath;
    if (userPath === undefined) {
        newPath = path.join(config.paths.root, "newPath");
    } else {
        if (path.isAbsolute(userPath)) {
            newPath = userPath;
        } else {
            newPath = path.normalize(path.join(config.paths.root, userPath));
        }
    }

    config.paths.newPath = newPath;
});

extendEnvironment((hre) => {
    hre.example = lazyObject(() => new ExampleHardhatRuntimeEnvironmentField());
});
