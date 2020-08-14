import {
  Engine
} from "@babylonjs/core/Engines/engine";
import {
  Scene
} from "@babylonjs/core/scene";
import {
  SceneLoader
} from "@babylonjs/core/Loading";
import {
  Vector3
} from "@babylonjs/core/Maths/math";
import {
  FreeCamera
} from "@babylonjs/core/Cameras/freeCamera";
import {
  HemisphericLight
} from "@babylonjs/core/Lights/hemisphericLight";
import {
  Light
} from "@babylonjs/core/Lights/light";
import {
  Mesh
} from "@babylonjs/core/Meshes/mesh";
import {
  AbstractMesh
} from "@babylonjs/core/Meshes/abstractMesh";
import {
  WebXRDefaultExperience
} from "@babylonjs/core/XR/webXRDefaultExperience";

//import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF"

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
// import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Helpers/sceneHelpers";
import { Channel } from "phoenix"
import { GLTF2 } from "@babylonjs/loaders/glTF";
import { SceneComponentConstants } from "@babylonjs/core/sceneComponent";

export class Game {
  private _canvas: HTMLCanvasElement;
  private _channel: Channel;
  private _engine: Engine;
  public _scene?: Scene;
  private _camera?: FreeCamera;
  private _light?: Light;
  private _xrHelper?: WebXRDefaultExperience

  constructor(canvasElement: string) {
    // Create canvas and engine.
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new Engine(this._canvas, true);
  }

  async createScene(channel: Channel) {
    this._channel = channel;

    this._scene = new Scene(this._engine);

    SceneLoader.Append("./gltf/", "backyard.glb", this._scene, (scene) => {
      console.log("loaded a scene");
      const floor = scene.getMeshByName("Backyard Screenshot_1")
      console.log("floor is", floor)
      // here we add XR support
      scene.createDefaultXRExperienceAsync({
        floorMeshes: [floor],
        inputOptions: {
          forceInputProfile: 'oculus-touch-v2'
        }
      }).then((exp) => {
        exp.input.onControllerAddedObservable.add((inputSource) => {
          inputSource.onMeshLoadedObservable.add((mesh) => {
            mesh.onAfterWorldMatrixUpdateObservable.add((me) => {
              console.log(me.id, me.absolutePosition, me.absoluteRotationQuaternion)
            })
          });
        });
        exp.baseExperience.camera.onViewMatrixChangedObservable.add((cam) => {
          console.log("cam", cam.position, cam.absoluteRotation)
        })

      })

      // // this._xrHelper.baseExperience.camera.pos

      // if (!this._xrHelper.baseExperience) {
      //   // no xr support
      //   console.log("no xr support")
      // } else {
      //   console.log("xr is supported")
      //   // all good, ready to go
      // }
    });

    this._camera = new FreeCamera("camera1", new Vector3(0, 5, -10), this._scene);
    this._camera.setTarget(Vector3.Zero());
    this._camera.attachControl(this._canvas, true);
    this._light = new HemisphericLight("light1", new Vector3(0, 1, 0), this._scene);
    this._light.intensity = 0.3;
    // var sphere = Mesh.CreateSphere("sphere1", 16, 2, this._scene);
    // sphere.position.y = 1;

    const env = this._scene.createDefaultEnvironment({
      skyboxSize: 400,
    });






    return this._scene;

  }


  doRender(): void {
    // Run the render loop.
    this._engine.runRenderLoop(() => {
      this._scene?.render();
    });

    // The canvas/window resize event handler.
    window.addEventListener('resize', () => {
      this._engine.resize();
    });
  }
}
