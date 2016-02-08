angular.module('tradespider')

.controller('daxController', function ($scope, $state, $http, socket) {
  $scope.dax_1s = [];
  $scope.currentPage = 1;
  $scope.numPerPage = 10;
  $scope.maxSize = 5;

  $scope.daxData = function (page) {
    $http.post( socketUrl + '/dax/get_dax_data', {'page': page}).success(function (res, req) {
      if(res.status === 0){
        console.log('Error While Executing the query for: '+ $state.current.name);
      }else {
        if($state.current.name === 'dax.daxperiod60'){
          $scope.dax_1s = res;
        }else if($state.current.name === 'dax.daxperiod300'){
          $scope.dax_5s = res;
        }else if($state.current.name === 'dax.daxperiod900'){
          $scope.dax_15s = res;
        }
      }
    }).error(function (err) {
      console.log('Internet Connection Is Not Available.');
    });
  };

  $scope.deleteDaxRecords = function () {
    socket.emit('clear dax records');
  };

  socket.on('one minute dax-report', function(oneData){
    if($state.current.name === 'dax.daxperiod60'){
      $scope.dax_1s.push({
        'created_on': oneData.created_on,
        'summary': oneData.summary,
        'moving_averages': oneData.moving_averages,
        'technical_indicators': oneData.technical_indicators,
        'value': oneData.value,
        'change_type': oneData.change_type,
        'change_flag': oneData.change_flag,
        'signal_strength': oneData.signal_strength
      });
    }
  });

  socket.on('five minute dax-report', function(fiveData){
    if($state.current.name === 'dax.daxperiod300'){
      $scope.dax_5s.push({
        'created_on': fiveData.created_on,
        'summary': fiveData.summary,
        'moving_averages': fiveData.moving_averages,
        'technical_indicators': fiveData.technical_indicators,
        'value': fiveData.value,
        'change_type': fiveData.change_type,
        'change_flag': fiveData.change_flag,
        'signal_strength': fiveData.signal_strength
      });
    }
  });

  socket.on('fifteen minute dax-report', function(fifteenData){
    if($state.current.name === 'dax.daxperiod900'){
      $scope.dax_15s.push({
        'created_on': fifteenData.created_on,
        'summary': fifteenData.summary,
        'moving_averages': fifteenData.moving_averages,
        'technical_indicators': fifteenData.technical_indicators,
        'value': fifteenData.value,
        'change_type': fifteenData.change_type,
        'change_flag': fifteenData.change_flag,
        'signal_strength': fifteenData.signal_strength
      });
    }
  });

});
