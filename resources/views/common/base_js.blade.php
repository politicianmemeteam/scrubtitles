  <!--  Scripts-->
   <script src="/js/plugins_custom/jquery-2.1.4.min.js"></script>
        <!-- touchSwipe -->
        <script type="text/javascript" src="/js/plugins_custom/jquery.touchSwipe.min.js"></script>
        <!-- Discover  -->
        <script type="text/javascript" src="/js/plugins_custom/discover.js"></script>
  <script src="/js/prism.js"></script>
  <script src="/js/materialize.min.js"></script>
  <script src="/js/init.js"></script>
	<script type="text/javascript">
	$.ajaxSetup({
	   headers: { 'X-CSRF-Token' : $('meta[name=_token]').attr('content') }
	});
	</script>
  <script>
    $(document).ready(function(){
        $('select').material_select();
    });
  </script>