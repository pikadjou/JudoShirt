<section class="content-header">
    <h1>
        Articles
        <small>edit</small>
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
                    <h3 class="box-title">Hover Data Table</h3>
                    <div class="row">
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('Retour à la Liste'), 
                                ['action' => 'index'],
                                ['class' => 'btn btn-block btn-info']
                            ) ?>
                        </div>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <?= $this->Form->create($entity); ?>
                        <?php foreach ($types as $name => $type): ?>
                        <div class="form-group">
                            <?php
                            if(array_key_exists($name, $associations)){
                                echo $this->Form->input($associations[$name].'._ids', ['options' => $associationsList[$associations[$name]]]);
                            } else {
                                echo $this->Form->input($name, [
                                    'class' => ($type != "boolean") ? 'form-control' : '']);
                            }
                            ?>
                        </div>
                        <?php endforeach; ?>

                    <?=
                    $this->Form->button(__('Submit'));
                    $this->Form->end(); ?>
                </div>
            </div>
        </div>
    </div>
</section>