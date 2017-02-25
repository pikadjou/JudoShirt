<section class="content-header">
    <h1>
        Other cache
        <small>listes</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Tables</a></li>
        <li class="active">Data tables</li>
    </ol>
</section>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
            
               <div class="box-header">
                    <h3 class="box-title">
                        <?php echo $ktable; ?>
                    </h3>
                    <div class="row">
                        <div class="col-sm-3">
                           <?= $this->Form->postLink(__('Update Prints'), 
                           ['action' => 'updatePrints', $ktable],
                           ['class' => 'btn btn-block btn-info']) ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>