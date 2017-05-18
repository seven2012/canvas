  
  let width = $('#canvasWrapper').width()
  let height = $('#canvasWrapper').height()
  console.log(width)
  console.log(height)

  let $canvas = $('#canvasWrapper')
    .append(`<canvas width="${width}" height="${height}"/>`).children('canvas')
  $canvas.css({
    position: 'absolute',
    top: 0,
    left: 0
  })
  let canvas = $canvas[0]

  let lastPoint = null
  $canvas.on('touchstart', function (e) {
    let tool = getTool()
    let touch = e.originalEvent.touches[0]
    let {x, y} = getMousePosition($canvas[0], touch)
    touchStartAction(tool, x, y)
  })

  function touchStartAction (tool, x, y) {
    if (tool === 'pen') {
      lastPoint = {x: x, y: y}
    } else if (tool === 'eraser') {
      erase(x, y, 10, 10)
    } else if (tool === 'clear'){
      clear(width,height,width,height)
    }
  }

  $canvas.on('touchmove', function (e) {
    e.preventDefault()
    let tool = getTool()
    let touch = e.originalEvent.touches[0]
    let {x, y} = getMousePosition($canvas[0], touch)
    touchMoveAction(tool, x, y)
  })

  function touchMoveAction (tool, x, y) {
    if (tool === 'pen') {
      drawLine(lastPoint.x, lastPoint.y, x, y)
      lastPoint = {x: x, y: y}
    } else if (tool === 'eraser') {
      erase(x, y, 10, 10)
    }
    

  }

  function drawLine (x1, y1, x2, y2) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function getMousePosition (canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function erase (x, y, width, height) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(x - width / 2, y - height / 2, width, height)
  }
  function clear(x,y,width,height) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
  }

  function getTool () {
    return $('[name=tool]:checked').val()
  }

