import React, { Component } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import adapter from 'webrtc-adapter';
let $ = require("jquery");
import Quagga from 'quagga';
import ZXing from '../../../../../assets/js/zxing-pdf417'

// styled
import StyledModal from "./ModalCss";

console.log($, "jquery")

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  static defaultProps = {
    id: "",
    modalClass: "",
    modalSize: "md"
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    modalClass: PropTypes.string,
    modalSize: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      fadeType: null
    };
    // Refs
    this.interactiveRef = React.createRef();
    // function
    this.transitionEnd = this.transitionEnd.bind(this);
    this.onEscKeyDown = this.onEscKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  background = React.createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.onEscKeyDown, false);
    setTimeout(() => this.setState({ fadeType: "in" }), 0);

    // scanner functionality
    const interactiveNode = this.interactiveRef.current;
    console.log(interactiveNode, "ref - component did mount")
    scanner(interactiveNode);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isOpen && prevProps.isOpen) {
      this.setState({ fadeType: "out" });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscKeyDown, false);
  }

  transitionEnd = e => {
    if (e.propertyName !== "opacity" || this.state.fadeType === "in") return;

    if (this.state.fadeType === "out") {
      this.props.onClose();
    }
  };

  onEscKeyDown = e => {
    if (e.key !== "Escape") return;
    this.setState({ fadeType: "out" });
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ fadeType: "out" });
  };

  render() {
    return ReactDom.createPortal(
      <React.Fragment>
        <StyledModal
          id={this.props.id}
          className={`wrapper ${"size-" + this.props.modalSize} fade-${
            this.state.fadeType
            } ${this.props.modalClass}`}
          role="dialog"
          modalSize={this.props.modalSize}
          onTransitionEnd={this.transitionEnd}
        >
          <div className="box-dialog">
            <div className="box-header">
              <h4 className="box-title">Place barcode in scaner view finder</h4>
              <button onClick={this.handleClick} className="close">
                ×
              </button>
            </div>

            <section id="container" class="container">
              <div className="box-content">
                <div class="controls">
                  <fieldset class="input-group">
                    <button class="stop">Stop</button>
                  </fieldset>
                  <fieldset class="reader-config-group">
                    <label>
                      <span>Barcode-Type</span>
                      <select name="decoder_readers">
                        <option value="code_128" selected="selected">Code 128</option>
                        <option value="code_39">Code 39</option>
                        <option value="code_39_vin">Code 39 VIN</option>
                        <option value="ean">EAN</option>
                        <option value="ean_extended">EAN-extended</option>
                        <option value="ean_8">EAN-8</option>
                        <option value="upc">UPC</option>
                        <option value="upc_e">UPC-E</option>
                        <option value="codabar">Codabar</option>
                        <option value="i2of5">Interleaved 2 of 5</option>
                        <option value="2of5">Standard 2 of 5</option>
                        <option value="code_93">Code 93</option>
                      </select>
                    </label>
                    <label>
                      <span>Resolution (width)</span>
                      <select name="input-stream_constraints">
                        <option value="320x240">320px</option>
                        <option selected="selected" value="640x480">640px</option>
                        <option value="800x600">800px</option>
                        <option value="1280x720">1280px</option>
                        <option value="1600x960">1600px</option>
                        <option value="1920x1080">1920px</option>
                      </select>
                    </label>
                    <label>
                      <span>Patch-Size</span>
                      <select name="locator_patch-size">
                        <option value="x-small">x-small</option>
                        <option value="small">small</option>
                        <option selected="selected" value="medium">medium</option>
                        <option value="large">large</option>
                        <option value="x-large">x-large</option>
                      </select>
                    </label>
                    <label>
                      <span>Half-Sample</span>
                      <input type="checkbox" checked="checked" name="locator_half-sample" />
                    </label>
                    <label>
                      <span>Workers</span>
                      <select name="numOfWorkers">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option selected="selected" value="4">4</option>
                        <option value="8">8</option>
                      </select>
                    </label>
                    <label>
                      <span>Camera</span>
                      <select name="input-stream_constraints" id="deviceSelection">
                      </select>
                    </label>
                    <label style="display: none">
                      <span>Zoom</span>
                      <select name="settings_zoom"></select>
                    </label>
                    <label style="display: none">
                      <span>Torch</span>
                      <input type="checkbox" name="settings_torch" />
                    </label>
                  </fieldset>
                </div>
                <div id="result_strip">
                  <ul class="thumbnails"></ul>
                  <ul class="collector"></ul>
                </div>
                <div id="interactive" class="viewport" ref={this.interactiveRef}></div>

              </div>
              <div className="box-footer" />
            </section>
          </div>
          <div
            className={`background`}
            onMouseDown={this.handleClick}
            ref={this.background}
          />
        </StyledModal>
      </React.Fragment>,
      modalRoot
    );
  }
}

const scanner = $(function (Ref) {
  let resultCollector = Quagga.ResultCollector.create({
    capture: true,
    capacity: 20,
    blacklist: [{
      code: "WIWV8ETQZ1", format: "code_93"
    }, {
      code: "EH3C-%GU23RK3", format: "code_93"
    }, {
      code: "O308SIHQOXN5SA/PJ", format: "code_93"
    }, {
      code: "DG7Q$TV8JQ/EN", format: "code_93"
    }, {
      code: "VOFD1DB5A.1F6QU", format: "code_93"
    }, {
      code: "4SO64P4X8 U4YUU1T-", format: "code_93"
    }],
    filter: function (codeResult) {
      // only store results which match this constraint
      // e.g.: codeResult
      return true;
    }
  });
  console.log(Ref, "ref - quagga function")
  let App = {
    init: function () {
      let self = this;
      console.log(self, 'this', this.state, 'state', this.QuaggaState, "quagga")
      Quagga.init(this.QuaggaState, function (err) {
        if (err) {
          return self.handleError(err);
        }
        //Quagga.registerResultCollector(resultCollector);
        App.attachListeners();
        App.checkCapabilities();
        Quagga.start();
      });
    },
    handleError: function (err) {
      console.log(err);
    },
    checkCapabilities: function () {
      let track = Quagga.CameraAccess.getActiveTrack();
      let capabilities = {};
      if (typeof track.getCapabilities === 'function') {
        capabilities = track.getCapabilities();
      }
      this.applySettingsVisibility('zoom', capabilities.zoom);
      this.applySettingsVisibility('torch', capabilities.torch);
    },
    updateOptionsForMediaRange: function (node, range) {
      console.log('updateOptionsForMediaRange', node, range);
      let NUM_STEPS = 6;
      let stepSize = (range.max - range.min) / NUM_STEPS;
      let option;
      let value;
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
      for (let i = 0; i <= NUM_STEPS; i++) {
        value = range.min + (stepSize * i);
        option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        node.appendChild(option);
      }
    },
    applySettingsVisibility: function (setting, capability) {
      // depending on type of capability
      if (typeof capability === 'boolean') {
        let node = document.querySelector('input[name="settings_' + setting + '"]');
        if (node) {
          node.parentNode.style.display = capability ? 'block' : 'none';
        }
        return;
      }
      if (window.MediaSettingsRange && capability instanceof window.MediaSettingsRange) {
        let node = document.querySelector('select[name="settings_' + setting + '"]');
        if (node) {
          this.updateOptionsForMediaRange(node, capability);
          node.parentNode.style.display = 'block';
        }
        return;
      }
    },
    initCameraSelection: function () {
      let streamLabel = Quagga.CameraAccess.getActiveStreamLabel();

      return Quagga.CameraAccess.enumerateVideoDevices()
        .then(function (devices) {
          function pruneText(text) {
            return text.length > 30 ? text.substr(0, 30) : text;
          }
          let $deviceSelection = document.getElementById("deviceSelection");
          while ($deviceSelection.firstChild) {
            $deviceSelection.removeChild($deviceSelection.firstChild);
          }
          devices.forEach(function (device) {
            let $option = document.createElement("option");
            $option.value = device.deviceId || device.id;
            $option.appendChild(document.createTextNode(pruneText(device.label || device.deviceId || device.id)));
            $option.selected = streamLabel === device.label;
            $deviceSelection.appendChild($option);
          });
        });
    },
    attachListeners: function () {
      let self = this;

      self.initCameraSelection();
      $(".controls").on("click", "button.stop", function (e) {
        e.preventDefault();
        Quagga.stop();
        self._printCollectedResults();
      });

      $(".controls .reader-config-group").on("change", "input, select", function (e) {
        e.preventDefault();
        let $target = $(e.target),
          value = $target.attr("type") === "checkbox" ? $target.prop("checked") : $target.val(),
          name = $target.attr("name"),
          state = self._convertNameToState(name);

        console.log("Value of " + state + " changed to " + value);
        self.setState(state, value);
      });
    },
    _printCollectedResults: function () {
      let results = resultCollector.getResults(),
        $ul = $("#result_strip ul.collector");

      results.forEach(function (result) {
        let $li = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');

        $li.find("img").attr("src", result.frame);
        $li.find("h4.code").html(result.codeResult.code + " (" + result.codeResult.format + ")");
        $ul.prepend($li);
      });
    },
    _accessByPath: function (obj, path, val) {
      let parts = path.split('.'),
        depth = parts.length,
        setter = (typeof val !== "undefined") ? true : false;

      return parts.reduce(function (o, key, i) {
        if (setter && (i + 1) === depth) {
          if (typeof o[key] === "object" && typeof val === "object") {
            Object.assign(o[key], val);
          } else {
            o[key] = val;
          }
        }
        return key in o ? o[key] : {};
      }, obj);
    },
    _convertNameToState: function (name) {
      return name.replace("_", ".").split("-").reduce(function (result, value) {
        return result + value.charAt(0).toUpperCase() + value.substring(1);
      });
    },
    detachListeners: function () {
      $(".controls").off("click", "button.stop");
      $(".controls .reader-config-group").off("change", "input, select");
    },
    applySetting: function (setting, value) {
      let track = Quagga.CameraAccess.getActiveTrack();
      if (track && typeof track.getCapabilities === 'function') {
        switch (setting) {
          case 'zoom':
            return track.applyConstraints({ advanced: [{ zoom: parseFloat(value) }] });
          case 'torch':
            return track.applyConstraints({ advanced: [{ torch: !!value }] });
        }
      }
    },
    setState: function (path, value) {
      let self = this;

      if (typeof self._accessByPath(self.inputMapper, path) === "function") {
        value = self._accessByPath(self.inputMapper, path)(value);
      }

      if (path.startsWith('settings.')) {
        let setting = path.substring(9);
        return self.applySetting(setting, value);
      }
      self._accessByPath(self.state, path, value);

      console.log(JSON.stringify(self.state));
      App.detachListeners();
      Quagga.stop();
      App.init();
    },
    inputMapper: {
      inputStream: {
        constraints: function (value) {
          if (/^(\d+)x(\d+)$/.test(value)) {
            let values = value.split('x');
            return {
              width: { min: parseInt(values[0]) },
              height: { min: parseInt(values[1]) }
            };
          }
          return {
            deviceId: value
          };
        }
      },
      numOfWorkers: function (value) {
        return parseInt(value);
      },
      decoder: {
        readers: function (value) {
          if (value === 'ean_extended') {
            return [{
              format: "ean_reader",
              config: {
                supplements: [
                  'ean_5_reader', 'ean_2_reader'
                ]
              }
            }];
          }
          return [{
            format: value + "_reader",
            config: {}
          }];
        }
      }
    },
    QuaggaState: {
      inputStream: {
        type: "LiveStream",
        target: Ref,
        constraints: {
          width: { min: 640 },
          height: { min: 480 },
          facingMode: "environment",
          aspectRatio: { min: 1, max: 2 }
        }
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
        readers: [{
          format: "upc_a",
          config: {}
        }]
      },
      locate: true
    },
    lastResult: null
  };

  App.init();

  Quagga.onProcessed(function (result) {
    let drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay;

    if (result.box) {
      ctx = Quagga.canvas.ctx.overlay;
      canvas = Quagga.canvas.dom.overlay;
      cw = parseInt(canvas.getAttribute("width"));
      ch = parseInt(canvas.getAttribute("height"));

      if (result.codeResult.format === "upc_a") {
        imageData = ctx.getImageData(0, 0, cw, ch);

        source = new ZXing.BitmapLuminanceSource(imageData);
        binarizer = new ZXing.Common.HybridBinarizer(source);
        bitmap = new ZXing.BinaryBitmap(binarizer);

        pdf417 = ZXing.PDF417.PDF417Reader.decode(bitmap, null, false);

        // parse the read pdf417 string if need be and set the value on the result

        result.codeResult.code = pdf417; // or some portion therein
      }
    }
  });

  Quagga.onDetected(function (result) {
    let code = result.codeResult.code;

    if (App.lastResult !== code) {
      App.lastResult = code;
      let $node = null, canvas = Quagga.canvas.dom.image;

      $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
      $node.find("img").attr("src", canvas.toDataURL());
      $node.find("h4.code").html(code);
      $("#result_strip ul.thumbnails").prepend($node);
    }
  });

});

export default Modal;
