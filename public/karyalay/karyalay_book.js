var app = angular.module('KaryalayApp');
  app.controller('karyalayBookCtrl', function ($scope, $modal, $log, $http, Flash, Auth, $window, storeKaryalayInfo) {
    $scope.karyalay_lists_id = storeKaryalayInfo.getKaryalayInfo();
    $scope.animationsEnabled = true;
    $scope.events = [];

    $scope.createSuccess = function () {
      var message = '<strong>Package Created!</strong>';
      Flash.create('success', message);
    };

    $scope.slotSelected = function(start, end, jsEvent, view){
      $scope.open(start, end, jsEvent, view, 'lg');
    };

    $scope.alertOnEventClick = function(event, jsEvent, view) {
      $scope.openEdit(event, jsEvent, view, 'lg');
    };

    $scope.uiConfig = {
      calendar:{
        firstDay: new Date().getDay(),
        defaultView: 'agendaWeek',
        height: 'auto',
        slotDuration: '01:00:00',
        selectable: true,
        header:{
          left: 'agendaDay agendaWeek month',
          center: 'title',
          right: 'today prev,next'
        },
        views: {
          agendaWeek: {
            titleFormat: 'MMMM DD, YYYY',
          }
        },
        editable: true,
        timezone: 'local',
        select: $scope.slotSelected,
        eventClick: $scope.alertOnEventClick,
      }
    };

    $scope.openEdit = function (event, jsEvent, view, size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'karyalayBooking.html',
        controller: 'BookEditKaryalayModalInstanceCtrl',
        size: size,
        backdrop: 'static',
        resolve: {
          items: function () {
            var items = {
              'event': event,
              'jsEvent': jsEvent,
              'view': view,
              'karyalay_lists_id': $scope.karyalay_lists_id
            };
            return items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
        var data = {karyalay_package: $scope.extend($scope.selected, {from_date: moment($scope.selected.from_date).format()})};
        var url_to_post = '/karyalay_packages/' + event.id;
        $http.put(url_to_post, data)
          .success(function (response) {
            if(response.status){
              if($scope.selected.subject){
                event.title = $scope.selected.subject
              }
              event.start = moment(moment($scope.selected.from_date).format('YYYY-MM-DD') + 'T' + moment($scope.selected.from_time).format('HH:mm'), 'YYYY-MM-DDTHH:mm'),
              event.end = moment(moment($scope.selected.from_date).format('YYYY-MM-DD') + 'T' + moment($scope.selected.to_time).format('HH:mm'), 'YYYY-MM-DDTHH:mm')
              $('#calendar').fullCalendar('updateEvent', event);
            }else{

            }
        });
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.open = function (start, end, jsEvent, view, size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'karyalayBooking.html',
        controller: 'BookKaryalayModalInstanceCtrl',
        size: size,
        backdrop: 'static',
        resolve: {
          items: function () {
            var items = {
              'start': start,
              'end': end,
              'jsEvent': jsEvent,
              'view': view,
              'karyalay_lists_id': $scope.karyalay_lists_id
            };
            return items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
        var data = {karyalay_package: $scope.extend($scope.selected, {karyalay_lists_id: $scope.karyalay_lists_id})};
        var url_to_post = '/karyalay_packages';
        $http.post(url_to_post, data)
          .success(function (response) {
            if(response){
              var eventSource = $scope.extend($scope.formatEvent(selectedItem), {id: response.id});
              $scope.events.push(eventSource);
              $scope.createSuccess();
            }else{

            }
        });
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.formatEvent = function(event){
      $scope.extend(event,{
                            id: event.id,
                            title: event.subject,
                            stick: true,
                            start: moment(moment(event.from_date).format('YYYY-MM-DD') + 'T' + moment(event.from_time).format('HH:mm'), 'YYYY-MM-DDTHH:mm'),
                            end: moment(moment(event.from_date).format('YYYY-MM-DD') + 'T' + moment(event.to_time).format('HH:mm'), 'YYYY-MM-DDTHH:mm')
                          });
      return event;
    };

    $http.get('fetch_karyalay_package', {params: {id: $scope.karyalay_lists_id}})
      .success(function (response) {
        $scope.each(response, function(event){
          $scope.events.push($scope.formatEvent(event));
        });
      });

    $scope.eventSources = [$scope.events];

  });
