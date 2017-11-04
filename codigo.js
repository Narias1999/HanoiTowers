$(function () {
$('a').click(function(){
  startGame();
})
let jugadas = 0
$('#jugadas').html(jugadas)
$('.aro').draggable({disabled: true})

$('#drag1').data('data', {
  value: 1,
  status: false,
  top: false,
  lastTower: $('#tower1')
})
$('#drag2').data('data', {
  value: 2,
  status: false,
  top: false,
  lastTower: $('#tower1')
})
$('#drag3').data('data', {
  value: 3,
  status: false,
  top: false,
  lastTower: $('#tower1')
})
$('#tower1').data('data',{
  pos: 'left',
  maxValue: 3,
  jugadas: 0,
  elements: [$("#drag1"),$('#drag2'),$('#drag3')]
})
$('#tower2').data('data',{
  pos: 'center',
  maxValue: 0,
  jugadas: 0,
  elements: []
})
$('#tower3').data('data',{
  pos: 'right',
  maxValue: 0,
  jugadas: 0,
  elements: []
})
let elements = $('#tower1').data('data').elements
elements[elements.length-1].draggable({disabled:false})
$( ".tower" ).droppable({
  drop: function( event, ui ) {
    jugadas++
    $('#jugadas').html(jugadas)
  	let maxValue = $(this).data("data").maxValue
  	let dragValue = ui.draggable.data("data").value
  	
    if (dragValue < maxValue) {
      ui.draggable.draggable({
        revert: true
      })
      setTimeout(function(){
        ui.draggable.draggable({revert: false})
      }, 400)
    }
    else{
      let estado = false
      $(this).data('data').elements.forEach(function(el){
        if (el[0] == ui.draggable[0]) estado = true
      })
      if (!estado) $(this).data("data").elements.push(ui.draggable)

      let lastTower = ui.draggable.data('data').lastTower
      let elements = lastTower.data('data').elements
      if (lastTower[0] != $(this)[0]){
        elements.pop()
      } 
      
      if (elements.length > 0){
        elements[elements.length-1].draggable({disabled:false})
        lastTower.data('data').maxValue = elements[elements.length-1].data('data').value
      }else lastTower.data('data').maxValue = 0
      ui.draggable.data('data').lastTower = $(this)
      elements = $(this).data('data').elements
      if (elements.length>1) {
        elements.forEach(el => el.draggable({disabled:true}))
      }
      elements[elements.length-1].draggable({disabled:false})
      $(this).data("data").maxValue = dragValue
    }

    let top = 65.4 - ($(this).data("data").elements.length * 3)
    top = `${top}vh`
    let left = ""
  	let position = $(this).data('data').pos
  	if (position == 'center') {
  		left = 29.4 + dragValue
  		left = `${left}vw`
  	}else if (position == 'left') {
  		left = 3 + dragValue
  		left = `${left}vw`
  	}else{
  		left = 56 + dragValue
  		left = `${left}vw`
  	}
  	ui.draggable.css({
  		top,
  		left,
  		transition: ".4s",
    })
    setTimeout(function(){
      ui.draggable.css({transition: "0s"})
      validarVictoria('easy')
    }, 400)
  }
})
})

function validarVictoria(level){
  if (level == 'easy') level = 3
  else if(level == 'hard') level = 5
  else level = 8
  console.log(level)
  const elementsT2 = $('#tower2').data('data').elements.length
  const elementsT3 = $('#tower3').data('data').elements.length
  console.log(elementsT2+ " "+ elementsT3)
  if (elementsT2 == level || elementsT3 == level) {
    alert('Ganaste!')
  }
}
function startGame(){
  $('#mainFace').css({
    transform: 'scale(0)',
    'border-radius':'50%'
  })
  setTimeout(function(){
    $('#game').css({
      transform: 'scale(1)',
      'border-radius': 0
    })
  },400)
}