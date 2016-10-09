 <section class="content-header">
    <h1>
        Articles
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
                    <h3 class="box-title">Hover Data Table</h3>
                    <div>
                        <?= $this->Html->link(__('Retour à la Liste'), ['action' => 'index']) ?>

                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $data->id]) ?>
                        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $data->id], ['confirm' => __('Are you sure you want to delete # {0}?', $data->id)]) ?>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                        <?php foreach ($types as $name => $type): ?>
                        <div class="col-md-3 
                        <?php 
                            switch ($type):
                                case "integer": ?>
                                   numbers
                                    <?php break;
                                case "string": ?>
                                   strings
                                    <?php break;
                                case "text": ?>
                                   texts col-lg-6
                                    <?php break;
                                default: break;
                            endswitch; ?>
                        ">
                            <div class="box box-default box-solid">
                                <div class="box-header">
                                    <h3 class="box-title"><?= __($name) ?></h3>
                                </div>
                                <div class="box-body">
                                    <?php 
                                        switch ($type){
                                            case "boolean": ?>
                                                <input type="checkbox" <?php echo ($data->$name == 1) ? 'checked' : '' ?> disabled>
                                                <?php break;
                                            default:
                     
                                                switch ($name){
                                                    case "image":
                                                    case "thumbnail": ?>
                                                        <img src="<?php echo $data->$name; ?>">
                                                        <?php break;
                                                    case "lastProductsUpdate": ?>
                                                        <?php echo date("d-m-Y", $data->$name); ?>
                                                        <?php break;
                                                    default: ?>
                                                        <?= h($data->$name) ?>
                                                        <?php break;
                                                }

                                        } 
                                    ?>
                                </div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>