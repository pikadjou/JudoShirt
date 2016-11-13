<?php 
    $datas = $datas->toArray();
    $data = $datas[0][$joins[1]->joinalias]; 
?>
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
                    <h3 class="box-title"></h3>
                    <div class="row">
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('Retour à la Liste'), 
                                ['action' => 'index', $mainView],
                                ['class' => 'btn btn-block btn-info']
                            ) ?>
                        </div>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                        <?php foreach ($joins[1]->structure as $name => $type): 
                            if(!in_array($name, $allowField)){
                                continue;
                            }
                            ?>
                            <div class="col-sm-3 columns">
                                <h6 class="subheader"><?= __($name) ?></h6>
                                <p>
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

                                    } ?>
                                </p>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <?= $this->Form->create(null) ?>
                    <fieldset>
                        <legend><?= __('Edit') ?></legend>
                        <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Check</th>
                                <?php foreach ($joins[2]->structure as $name => $type): 
                                    if(!in_array($name, $allowField)){
                                        continue;
                                    }
                                    ?>
                                    <th><?php echo $name ?></th>
                                <?php endforeach; ?>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($datasList as $data): ?>
                            <tr>
                                <td>
                                    <?php 
                                    $check = false;
                                    foreach ($datas as $link){
                                        
                                        if($link[$joins[2]->joinalias]->id === $data[$joins[2]->joinalias]->id){
                                            $check = true;
                                            break;
                                        }
                                    }                     
                                    echo $this->Form->checkbox($data[$joins[2]->joinalias]->id, ['checked' => ($check) ? 1 : 0, 'hiddenField' => false]);
                                    ?>

                                    <!--<input type="checkbox" <?php echo ($check) ? 'checked' : '' ?>>-->
                                </td>
                                <?php 
                                $dataJoin = $data[$joins[2]->joinalias];
                                foreach ($joins[2]->structure as $name => $type): 
                                    if(!in_array($name, $allowField)){
                                        continue;
                                    }
                                    ?>
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
                    </fieldset>
                    <?= $this->Form->button(__('Submit'), ['class' => "btn btn-primary"]) ?>
                    <?= $this->Form->end() ?>
                </div>
            </div>
        </div>
    </div>
</section>