angular.module('tradespider')

.controller('dowController', function ($scope, $state, socket) {

  $scope.dowData = function (page) {
      socket.emit('get dow data', {'page': page});
  };

  $scope.deleteDowRecords = function () {
    socket.emit('clear dow records');
  };

  socket.on('dow data', function(data){
    if($state.current.name === 'dow.dowperiod60'){
      $scope.dow_1s = data.dow;
    }else if($state.current.name === 'dow.dowperiod300'){
      $scope.dow_5s = data.dow;
    }else if($state.current.name === 'dow.dowperiod900'){
      $scope.dow_15s = data.dow;
    }
  });

  socket.on('one minute dow-report', function(oneData){
    if($state.current.name === 'dow.dowperiod60'){
      $scope.dow_1s.push({
        'created_on': oneData.created_on,
        'summary': oneData.summary,
        'moving_averages': oneData.moving_averages,
        'technical_indicators': oneData.technical_indicators,
        'value': oneData.value,
        'change_type': oneData.change_type,
        'change_flag': oneData.change_flag
      });
    }
  });

  socket.on('five minute dow-report', function(fiveData){
    if($state.current.name === 'dow.dowperiod300'){
      $scope.dow_5s.push({
        'created_on': fiveData.created_on,
        'summary': fiveData.summary,
        'moving_averages': fiveData.moving_averages,
        'technical_indicators': fiveData.technical_indicators,
        'value': fiveData.value
      });
    }
  });

  socket.on('fifteen minute dow-report', function(fifteenData){
    if($state.current.name === 'dow.dowperiod900'){
      $scope.dow_15s.push({
        'created_on': fifteenData.created_on,
        'summary': fifteenData.summary,
        'moving_averages': fifteenData.moving_averages,
        'technical_indicators': fifteenData.technical_indicators,
        'value': fifteenData.value
      });
    }
  });

});