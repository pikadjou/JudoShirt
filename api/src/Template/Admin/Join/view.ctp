<?php 
    $datas = $datas->toArray();
    $data = $datas[0][$joins[1]->joinalias]; 
?>
<section class="content-header">
    <h1>
        <?= h($data->name) ?>
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
                    <h3 class="box-title"></h3>
                    <div class="row">
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('Retour à la Liste'), 
                                ['action' => 'index', $mainView],
                                ['class' => 'btn btn-block btn-info']
                            ) ?>
                        </div>
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('Edit'), 
                                ['action' => 'edit', $mainView, $data->id],
                                ['class' => 'btn btn-block btn-success']
                            ) ?>
                        </div>
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('Delete'), 
                                ['action' => 'delete', $data->id],
                                ['class' => 'btn btn-block btn-danger'],
                                ['confirm' => __('Are you sure you want to delete # {0}?', $data->id)]
                            ) ?>
                        </div>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                        <?php foreach ($joins[1]->structure as $name => $type): ?>
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
                                                    case "lastUpdate": ?>
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

                    <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <?php foreach ($joins[2]->structure as $name => $type): ?>
                                <th><?php echo $name ?></th>
                            <?php endforeach; ?>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($datas as $data): ?>
                        <tr>
                            <?php 
                            $dataJoin = $data[$joins[2]->joinalias];
                            foreach ($joins[2]->structure as $name => $type): ?>
                                <td>
                                    <?php 
                                    if($type == null){
                                        echo $dataJoin->$name;
                                    } else{
                                        switch ($type){
                                            case "boolean": ?>
                                                <input type="checkbox" <?php echo ($dataJoin->$name == 1) ? 'checked' : '' ?> disabled>
                                                <?php break;
                                            case "text": ?>
                                                <?php echo $this->Text->truncate($dataJoin->$name); ?>
                                                <?php break;
                                            default:

                                                switch ($name){
                                                    case "image":
                                                    case "thumbnail": 
                                                    case "sizeThumbnail": ?>
                                                        <img src="<?php echo $dataJoin->$name; ?>">
                                                        <?php break;
                                                    default: ?>
                                                        <?= h($dataJoin->$name) ?>
                                                        <?php break;
                                                }

                                        }
                                    }
                                     ?>
                                </td>
                            <?php endforeach; ?>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>