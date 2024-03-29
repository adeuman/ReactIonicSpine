import { spine } from "./spine-canvas";

let lastFrameTime = Date.now() / 1000;
let canvas, context;
let assetManager;
let skeleton, state, bounds;
let skeletonRenderer;

let skelName = "spineboy-ess";
let animName = "walk";

let init = () => {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    skeletonRenderer = new spine.canvas.SkeletonRenderer(context);
    // enable debug rendering
    skeletonRenderer.debugRendering = true;
    // enable the triangle renderer, supports meshes, but may produce artifacts in some browsers
    skeletonRenderer.triangleRendering = false;
    assetManager = new spine.canvas.AssetManager();
    assetManager.loadText("assets/" + skelName + ".json");
    assetManager.loadText("assets/" + skelName.replace("-pro", "").replace("-ess", "") + ".atlas");
    assetManager.loadTexture("assets/" + skelName.replace("-pro", "").replace("-ess", "") + ".png");
    requestAnimationFrame(load);
};

let load = () => {
    if (assetManager.isLoadingComplete()) {
        let data = loadSkeleton(skelName, animName, "default");
        skeleton = data.skeleton;
        state = data.state;
        bounds = data.bounds;
        requestAnimationFrame(render);
    } else {
        requestAnimationFrame(load);
    }
};

let loadSkeleton = (name, initialAnimation, skin) => {
    if (skin === undefined) skin = "default";
    // Load the texture atlas using name.atlas and name.png from the AssetManager.
    // The function passed to TextureAtlas is used to resolve relative paths.
    let atlas = new spine.TextureAtlas(assetManager.get("assets/" + name.replace("-pro", "").replace("-ess", "") + ".atlas"), function(path) {
        return assetManager.get("assets/" + path);
    });
    // Create a AtlasAttachmentLoader, which is specific to the WebGL backend.
    let atlasLoader = new spine.AtlasAttachmentLoader(atlas);
    // Create a SkeletonJson instance for parsing the .json file.
    let skeletonJson = new spine.SkeletonJson(atlasLoader);
    // Set the scale to apply during parsing, parse the file, and create a new skeleton.
    let skeletonData = skeletonJson.readSkeletonData(assetManager.get("assets/" + name + ".json"));
    let skeleton = new spine.Skeleton(skeletonData);
    skeleton.scaleY = -1;
    let bounds = calculateBounds(skeleton);
    skeleton.setSkinByName(skin);
    // Create an AnimationState, and set the initial animation in looping mode.
    let animationState = new spine.AnimationState(new spine.AnimationStateData(skeleton.data));
    animationState.setAnimation(0, initialAnimation, true);
    animationState.addListener({
        event: function(trackIndex, event) {
            // console.log("Event on track " + trackIndex + ": " + JSON.stringify(event));
        },
        complete: function(trackIndex, loopCount) {
            // console.log("Animation on track " + trackIndex + " completed, loop count: " + loopCount);
        },
        start: function(trackIndex) {
            // console.log("Animation on track " + trackIndex + " started");
        },
        end: function(trackIndex) {
            // console.log("Animation on track " + trackIndex + " ended");
        }
    });
    // Pack everything up and return to caller.
    return { skeleton: skeleton, state: animationState, bounds: bounds };
};

let calculateBounds = (skeleton) => {
    let data = skeleton.data;
    skeleton.setToSetupPose();
    skeleton.updateWorldTransform();
    let offset = new spine.Vector2();
    let size = new spine.Vector2();
    skeleton.getBounds(offset, size, []);
    return { offset: offset, size: size };
};

let render = () => {
    let now = Date.now() / 1000;
    let delta = now - lastFrameTime;
    lastFrameTime = now;
    resize();
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillStyle = "#cccccc";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
    state.update(delta);
    state.apply(skeleton);
    skeleton.updateWorldTransform();
    skeletonRenderer.draw(skeleton);
    context.strokeStyle = "green";
    context.beginPath();
    context.moveTo(-1000, 0);
    context.lineTo(1000, 0);
    context.moveTo(0, -1000);
    context.lineTo(0, 1000);
    context.stroke();
    requestAnimationFrame(render);
};

let resize = () => {
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    if (canvas.width != w || canvas.height != h) {
        canvas.width = w;
        canvas.height = h;
    }
    // magic
    let centerX = bounds.offset.x + bounds.size.x / 2;
    let centerY = bounds.offset.y + bounds.size.y / 2;
    let scaleX = bounds.size.x / canvas.width;
    let scaleY = bounds.size.y / canvas.height;
    let scale = Math.max(scaleX, scaleY) * 1.2;
    if (scale < 1) scale = 1;
    let width = canvas.width * scale;
    let height = canvas.height * scale;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(1 / scale, 1 / scale);
    context.translate(-centerX, -centerY);
    context.translate(width / 2, height / 2);
};

export { init };
