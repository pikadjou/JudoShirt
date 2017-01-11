 <section class="content-header">
    <h1>
        Files
        <small>view</small>
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
                    <h3 class="box-title"><?php echo $key ?></h3>
                    <div class="row">
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('Retour à la Liste'), 
                                ['action' => 'files'],
                                ['class' => 'btn btn-block btn-info']
                            ) ?>
                        </div>
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('Delete'), 
                                ['action' => 'deleteFile', $key],
                                [
                                    'confirm' => __('Are you sure you want to delete # {0}?', $key),
                                    'class' => 'btn btn-block btn-danger'
                                ]
                            ) ?>
                        </div>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <?php dump($datas); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>