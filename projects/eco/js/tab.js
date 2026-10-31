  $(function(){
    $('.ui-tabs .nav-link').on('click', function(){
      const y=$(this).data('year');
      $('.ui-tabs .nav-link').removeClass('active');
      $(this).addClass('active');
      $('.results-table tbody').hide();
      $('.results-table tbody[data-year="'+y+'"]').show();
    });
  });